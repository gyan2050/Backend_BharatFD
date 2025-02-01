// import FAQ from "../models/faqModel";

// /**
//  * @desc Get all FAQs (with optional language translation)
//  * @route GET /api/faqs?lang=hi
//  */
// const getFAQs = async (req, res) => {
//   try {
//     const lang = req.query.lang || "en"; // Default to English
//     const faqs = await find();

//     // Map FAQs with translations
//     const translatedFAQs = faqs.map((faq) => ({
//       _id: faq._id,
//       ...faq.getTranslatedFAQ(lang),
//     }));

//     res.status(200).json(translatedFAQs);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching FAQs", error });
//   }
// };

// /**
//  * @desc Create a new FAQ
//  * @route POST /api/faqs
//  */
// const createFAQ = async (req, res) => {
//   try {
//     const { question, answer, translations } = req.body;
//     const newFAQ = new FAQ({ question, answer, translations });
//     await newFAQ.save();
//     res.status(201).json(newFAQ);
//   } catch (error) {
//     res.status(400).json({ message: "Error creating FAQ", error });
//   }
// };

// /**
//  * @desc Update an FAQ
//  * @route PUT /api/faqs/:id
//  */
// const updateFAQ = async (req, res) => {
//   try {
//     const { question, answer, translations } = req.body;
//     const updatedFAQ = await findByIdAndUpdate(
//       req.params.id,
//       { question, answer, translations },
//       { new: true }
//     );

//     if (!updatedFAQ) {
//       return res.status(404).json({ message: "FAQ not found" });
//     }

//     res.status(200).json(updatedFAQ);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating FAQ", error });
//   }
// };

// /**
//  * @desc Delete an FAQ
//  * @route DELETE /api/faqs/:id
//  */
// const deleteFAQ = async (req, res) => {
//   try {
//     const deletedFAQ = await findByIdAndDelete(req.params.id);

//     if (!deletedFAQ) {
//       return res.status(404).json({ message: "FAQ not found" });
//     }

//     res.status(200).json({ message: "FAQ deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting FAQ", error });
//   }
// };

// export default { getFAQs, createFAQ, updateFAQ, deleteFAQ };


const FAQ = require("../models/faqModel");
const redisClient = require("../config/redis");
const { translateText } = require("../services/translateService");


/**
 * @desc Get all FAQs (with caching)
 * @route GET /api/faqs?lang=hi
 */
const getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const cacheKey = `faqs:${lang}`;

    // Check Redis cache first
    const cachedFAQs = await redisClient.get(cacheKey);
    if (cachedFAQs) {
      return res.status(200).json(JSON.parse(cachedFAQs));
    }

    // If not cached, fetch from MongoDB
    const faqs = await FAQ.find();
    const translatedFAQs = faqs.map((faq) => ({
      _id: faq._id,
      ...faq.getTranslatedFAQ(lang),
    }));

    // Store in Redis for 1 hour
    await redisClient.setEx(cacheKey, 3600, JSON.stringify(translatedFAQs));

    res.status(200).json(translatedFAQs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs", error });
  }
};

// /**
//  * @desc Create a new FAQ (clear cache on update)
//  * @route POST /api/faqs
//  */
// const createFAQ = async (req, res) => {
//   try {
//     const { question, answer, translations } = req.body;
//     const newFAQ = new FAQ({ question, answer, translations });
//     await newFAQ.save();

//     // Clear cached FAQs
//     await redisClient.flushAll();

//     res.status(201).json(newFAQ);
//   } catch (error) {
//     res.status(400).json({ message: "Error creating FAQ", error });
//   }
// };

/**
 * @desc Create a new FAQ with automatic translation
 * @route POST /api/faqs
 */
const createFAQ = async (req, res) => {
    try {
      const { question, answer } = req.body;
  
      // Translate question & answer into multiple languages
      const translatedQuestions = await translateText(question);
      const translatedAnswers = await translateText(answer);
  
      // Construct translations object
      const translations = {};
      for (const lang of Object.keys(translatedQuestions)) {
        translations[lang] = {
          question: translatedQuestions[lang],
          answer: translatedAnswers[lang],
        };
      }
  
      const newFAQ = new FAQ({ question, answer, translations });
      await newFAQ.save();
  
      // Clear cache after new FAQ is created
      await redisClient.flushAll();
  
      res.status(201).json(newFAQ);
    } catch (error) {
      res.status(400).json({ message: "Error creating FAQ", error });
    }
  };
  

/**
 * @desc Update an FAQ (clear cache on update)
 * @route PUT /api/faqs/:id
 */
const updateFAQ = async (req, res) => {
  try {
    const { question, answer, translations } = req.body;
    const updatedFAQ = await FAQ.findByIdAndUpdate(
      req.params.id,
      { question, answer, translations },
      { new: true }
    );

    if (!updatedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    // Clear cached FAQs
    await redisClient.flushAll();

    res.status(200).json(updatedFAQ);
  } catch (error) {
    res.status(500).json({ message: "Error updating FAQ", error });
  }
};

/**
 * @desc Delete an FAQ (clear cache on deletion)
 * @route DELETE /api/faqs/:id
 */
const deleteFAQ = async (req, res) => {
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id);

    if (!deletedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    // Clear cached FAQs
    await redisClient.flushAll();

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting FAQ", error });
  }
};

module.exports = { getFAQs, createFAQ, updateFAQ, deleteFAQ };
