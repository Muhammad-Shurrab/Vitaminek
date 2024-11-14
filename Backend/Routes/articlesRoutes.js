const express = require("express");
const router = express.Router();
const articleController = require("../Controllers/articlesController");
const auth = require("../Middlewares/authMiddleware");
router.get("/", articleController.getArticles);
router.get("/:id", articleController.getArticle);
router.post("/", articleController.createArticle);
router.put("/:id", articleController.updateArticle);

router.delete("/:id", articleController.deleteArticle);

router.get("/:id/comments", articleController.getArticleComments);
router.post("/:id/comments", auth, articleController.addComment);
router.get("/:id/rating", auth, articleController.getUserRating);
router.post("/:id/rating", auth, articleController.handleRating);

module.exports = router;
