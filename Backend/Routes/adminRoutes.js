const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const { protect } = require("../Middlewares/authMiddleware");
const { isAdmin } = require("../Middlewares/adminMiddleware");

router.use(protect, isAdmin);

router.get("/stats", adminController.getDashboardStats);
router.get("/users", adminController.getUsers);
router.post("/users/:userId/ban", adminController.banUser);
router.get("/products", adminController.getProducts);
router.delete("/products/:productId", adminController.removeProduct);

module.exports = router;
