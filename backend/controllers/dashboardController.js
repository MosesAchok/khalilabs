const mongoose = require("mongoose");
const Contact = require("../models/Contact");
const Quote = require("../models/Quote");

// Dashboard overview statistics
const getDashboardOverview = async (req, res) => {
  try {
    const [
      totalContacts,
      newMessages,
      totalQuotes,
      pendingQuotes,
      reviewingQuotes,
      approvedQuotes,
      rejectedQuotes,
      recentContacts,
      recentQuotes,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
      Quote.countDocuments(),
      Quote.countDocuments({ status: "pending" }),
      Quote.countDocuments({ status: "reviewing" }),
      Quote.countDocuments({ status: "approved" }),
      Quote.countDocuments({ status: "rejected" }),
      Contact.find().sort({ createdAt: -1 }).limit(5),
      Quote.find().sort({ createdAt: -1 }).limit(5),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        statistics: {
          totalContacts,
          newMessages,
          totalQuotes,
          pendingQuotes,
          reviewingQuotes,
          approvedQuotes,
          rejectedQuotes,
        },
        recentContacts,
        recentQuotes,
      },
    });
  } catch (error) {
    console.error("Dashboard overview error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to load dashboard overview.",
    });
  }
};

// Get all contact messages
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve contact messages.",
    });
  }
};

// Update contact message status
const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["new", "read", "replied"];

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid contact message ID.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message status.",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after", runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact message not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Contact message status updated.",
      data: contact,
    });
  } catch (error) {
    console.error("Update contact status error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to update contact message status.",
    });
  }
};

// Get all quotation requests
const getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes,
    });
  } catch (error) {
    console.error("Get quotes error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve quotation requests.",
    });
  }
};

// Update quotation request status
const updateQuoteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "reviewing",
      "approved",
      "rejected",
    ];

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quotation request ID.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid quotation status.",
      });
    }

    const quote = await Quote.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after", runValidators: true }
    );

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: "Quotation request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quotation status updated.",
      data: quote,
    });
  } catch (error) {
    console.error("Update quote status error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to update quotation status.",
    });
  }
};

module.exports = {
  getDashboardOverview,
  getContacts,
  updateContactStatus,
  getQuotes,
  updateQuoteStatus,
};