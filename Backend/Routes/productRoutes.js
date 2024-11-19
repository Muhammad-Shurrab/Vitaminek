const express = require("express");
const router = express.Router();
const verifyToken = require("../Middlewares/authMiddleware");
const productController = require("../Controllers/productController");

router.post("/", verifyToken, productController.createProduct);
router.get("/", verifyToken, productController.getProducts);
router.get("/:id", verifyToken, productController.getProductsById);
module.exports = router;
