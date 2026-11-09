const Quote = require("../models/Quote");

// Submit a quotation request
const createQuote = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      service,
      budget,
      projectDetails,
    } = req.body;

    // Validate required fields
    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !service?.trim() ||
      !projectDetails?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required fields.",
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address.",
      });
    }

    // Save quotation request
    const quote = await Quote.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: company?.trim() || "",
      service: service.trim(),
      budget: budget?.trim() || "",
      projectDetails: projectDetails.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Your quotation request has been submitted successfully.",
      data: quote,
    });
  } catch (error) {
    console.error("Quote submission error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to submit your quotation request. Please try again.",
    });
  }
};

module.exports = {
  createQuote,
};