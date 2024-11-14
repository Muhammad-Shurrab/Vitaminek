// routes/orderRoutes.js
const express = require("express");
const authMiddleware = require("../Middlewares/authMiddleware");
const router = express.Router();
const orderController = require("../Controllers/orderController");

// Route to create a new order
router.post("/", authMiddleware, orderController.createOrder);

// Route to get all orders for a specific user
router.get("/:userId", authMiddleware, orderController.getUserOrders);

module.exports = router;
