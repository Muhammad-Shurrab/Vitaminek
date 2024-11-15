const express = require("express");
const router = express.Router();
const configController = require("../Controllers/configController");

router.get("/paypal", configController.getPayPalClientId);

module.exports = router;
