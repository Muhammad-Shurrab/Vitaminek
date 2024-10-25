const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cartController");
const authentication = require("../Middlewares/authMiddleware");

router.post("/add", authentication, cartController.addToCart);
router.post("/remove", authentication, cartController.removeFromCart);
router.get("/view", authentication, cartController.viewCart);

module.exports = router;
