const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/paymentController");

router.post("/", orderController.createOrder);
router.post("/stripe/:orderId", orderController.processStripePayment);
router.put("/:orderId/pay", orderController.updateOrderToPaid);

module.exports = router;
