const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");
const verifyToken = require("../Middlewares/authMiddleware");
// Create Order
router.post("/create", verifyToken, orderController.createOrder);

// Get Orders by User
router.get("/user/:userId", orderController.getUserOrders);

module.exports = router;
