const { sendClientReply } = require("../controllers/emailController");

const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getDashboardOverview,
  getContacts,
  updateContactStatus,
  getQuotes,
  updateQuoteStatus,
} = require("../controllers/dashboardController");

// All routes in this file require administrator authentication
router.use(protect);
router.post("/email/reply", sendClientReply);

// Dashboard overview
router.get("/overview", getDashboardOverview);

// Contact messages
router.get("/contacts", getContacts);
router.patch("/contacts/:id/status", updateContactStatus);

// Quotation requests
router.get("/quotes", getQuotes);
router.patch("/quotes/:id/status", updateQuoteStatus);

module.exports = router;