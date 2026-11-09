const express = require("express");

const router = express.Router();

const {
  createQuote,
} = require("../controllers/quoteController");

// POST /api/quotes
router.post("/", createQuote);

module.exports = router;