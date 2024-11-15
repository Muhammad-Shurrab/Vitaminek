const express = require("express");
const router = express.Router();
const adminOrderController = require("../Controllers/orderDashControllers"); // Adjust the path based on your project structure

// Route to get all pending orders
router.get("/pending", adminOrderController.getPendingOrders);

// Route to get all completed orders
router.get("/completed", adminOrderController.getCompletedOrders);

// Route to change the order status (from Pending to Completed)
router.put("/:orderId", adminOrderController.changeOrderStatus);

module.exports = router;
