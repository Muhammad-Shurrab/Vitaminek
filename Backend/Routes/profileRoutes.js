const express = require("express");
const router = express.Router();
const auth = require("../Middlewares/authMiddleware");
const upload = require("../config/multer");
const {
  getUserProfile,
  updateProfile,
  updatePassword,
} = require("../Controllers/profileController");

// Get user profile
router.get("/me", auth, getUserProfile);

// Update profile
router.put("/update", auth, upload.single("photo"), updateProfile);

// Update password
router.put("/update-password", auth, updatePassword);

module.exports = router;
