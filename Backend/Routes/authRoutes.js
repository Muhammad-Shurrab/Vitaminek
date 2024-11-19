const express = require("express");
const {
  registerUser,
  loginUser,
  googleLogin,
  logoutUser,
} = require("../Controllers/authController");

const verifyToken = require("../Middlewares/authMiddleware");

const router = express.Router();

console.log("in side auth router");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/google-login", googleLogin);
// router.post("logout", logoutUser);

module.exports = router;
