const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },  // Default language (English)
    answer: { type: String, required: true },    // RichText/WYSIWYG content
    translations: {
      hi: { question: String, answer: String },  // Hindi
      bn: { question: String, answer: String },  // Bengali
      fr: { question: String, answer: String },  // French
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Method to get translated FAQ based on lang query
FAQSchema.methods.getTranslatedFAQ = function (lang) {
  return {
    question: this.translations[lang]?.question || this.question,
    answer: this.translations[lang]?.answer || this.answer,
  };
};

const FAQ = mongoose.model("FAQ", FAQSchema);
module.exports = FAQ;
