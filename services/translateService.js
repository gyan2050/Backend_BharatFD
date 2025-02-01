const translate = require("google-translate-api-x");

// List of supported languages
const SUPPORTED_LANGUAGES = ["hi", "bn", "fr"]; // Hindi, Bengali, French

/**
 * @desc Translate text into multiple languages
 * @param {string} text - The text to translate
 * @returns {object} - Translated texts in different languages
 */
const translateText = async (text) => {
  const translations = {};

  for (const lang of SUPPORTED_LANGUAGES) {
    try {
      const response = await translate(text, { to: lang });
      translations[lang] = response.text;
    } catch (error) {
      console.error(`Error translating to ${lang}:`, error);
    }
  }

  return translations;
};

module.exports = { translateText };
