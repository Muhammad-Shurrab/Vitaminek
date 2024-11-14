const express = require("express");
const router = express.Router();
const adminController = require("../Controllers/adminController");
const verifyToken = require("../Middlewares/authMiddleware");
const isAdmin = require("../Middlewares/isAdminMiddleware");

// router.use(verifyToken, isAdmin);

router.get("/stats", verifyToken, isAdmin, adminController.getDashboardStats);
router.get("/users", isAdmin, verifyToken, adminController.getUsers);
router.post(
  "/users/:userId/ban",
  isAdmin,
  verifyToken,
  adminController.banUser
);
router.get("/products", isAdmin, verifyToken, adminController.getProducts);
router.delete(
  "/products/:productId",
  isAdmin,
  verifyToken,
  adminController.removeProduct
);

module.exports = router;
