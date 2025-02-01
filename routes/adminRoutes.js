const express = require("express");
const { getAllFAQs, deleteFAQ, updateFAQ } = require("../controllers/adminController");

const router = express.Router();

// Get all FAQs (without language filter)
router.get("/faqs", getAllFAQs);

// Update an FAQ
router.put("/faqs/:id", updateFAQ);

// Delete an FAQ
router.delete("/faqs/:id", deleteFAQ);

module.exports = router;
