const FAQ = require("../models/faqModel");

/**
 * @desc Get all FAQs (Admin View)
 * @route GET /api/admin/faqs
 */
const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs", error });
  }
};

/**
 * @desc Update an FAQ
 * @route PUT /api/admin/faqs/:id
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

    res.status(200).json(updatedFAQ);
  } catch (error) {
    res.status(500).json({ message: "Error updating FAQ", error });
  }
};

/**
 * @desc Delete an FAQ
 * @route DELETE /api/admin/faqs/:id
 */
const deleteFAQ = async (req, res) => {
  try {
    const deletedFAQ = await FAQ.findByIdAndDelete(req.params.id);

    if (!deletedFAQ) {
      return res.status(404).json({ message: "FAQ not found" });
    }

    res.status(200).json({ message: "FAQ deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting FAQ", error });
  }
};

module.exports = { getAllFAQs, updateFAQ, deleteFAQ };
