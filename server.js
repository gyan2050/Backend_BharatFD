require("dotenv").config();
const express = require("express");
const cors = require("cors");

// Import database and Redis setup
const connectDB = require("./config/db");
const faqRoutes = require("./routes/faqRoutes");

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to Database
connectDB();

// Routes
app.use("/api/faqs", faqRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
