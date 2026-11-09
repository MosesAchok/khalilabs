const express = require("express");

const router = express.Router();

const {
  loginAdmin,
  getAdminProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

// Admin login
router.post("/login", loginAdmin);

// Get authenticated admin profile
router.get("/me", protect, getAdminProfile);

module.exports = router;