const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productDashController");
const isAdmin = require("../Middlewares/isAdminMiddleware");

router.post("/", productController.createProduct); // Create product
router.get("/", productController.getAllProducts); // Get all products
router.put("/:id", productController.updateProduct); // Update product
router.delete("/:id", productController.deleteProduct); // Delete product

module.exports = router;
