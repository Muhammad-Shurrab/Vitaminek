const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const verifyToken = require("../Middlewares/authMiddleware"); // You'll need to implement this

// Apply auth middleware to all routes

// Profile routes
router.get("/", verifyToken, profileController.getProfile);
router.patch("/", verifyToken, profileController.updateProfile);
router.get("/articles", verifyToken, profileController.getArticleDashboard);
router.get("/orders", verifyToken, profileController.getOrderHistory);

module.exports = router;
