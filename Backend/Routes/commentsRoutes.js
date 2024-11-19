const express = require("express");
const router = express.Router();
const verifyToken = require("../Middlewares/authMiddleware");
const commentController = require("../Controllers/commetnsController");

router.post("/", verifyToken, commentController.createComment);
router.get("/:productId", commentController.getProductComments);
router.post("/:commentId/like", verifyToken, commentController.likeComment);

module.exports = router;
