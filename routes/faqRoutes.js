const express = require("express");
const { getFAQs, createFAQ, updateFAQ, deleteFAQ } = require("../controllers/faqController");

const router = express.Router();

// Routes for FAQs
router.get("/", getFAQs);       // Get all FAQs (with optional language selection)
router.post("/", createFAQ);    // Create a new FAQ
router.put("/:id", updateFAQ);  // Update an existing FAQ
router.delete("/:id", deleteFAQ); // Delete an FAQ

module.exports = router;
