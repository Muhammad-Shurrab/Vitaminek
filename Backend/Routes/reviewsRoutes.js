const express = require("express");
const router = express.Router();
const verifyToken = require("../Middlewares/authMiddleware");
const reviewController = require("../Controllers/reviewsController");

router.post("/", verifyToken, reviewController.createReview);
router.get("/:productId", reviewController.getProductReviews);

module.exports = router;
