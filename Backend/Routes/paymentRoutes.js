const express = require("express");
const router = express.Router();
const paymentController = require("../Controllers/paymentController");

router.post("/pay", paymentController.processPayment);

module.exports = router;
