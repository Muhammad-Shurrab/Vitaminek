const express = require("express");
const {
  getAllUsers,
  toggleUserStatus,
} = require("../Controllers/userController");
const router = express.Router();

router.get("/", getAllUsers);
router.put("/:userId/status", toggleUserStatus);

module.exports = router;
