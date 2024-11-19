const express = require("express");
const router = express.Router();
const articleController = require("../Controllers/articlesController");
const verifyToken = require("../Middlewares/authMiddleware");

// Public routes
router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById); // Change from slug to id

// Protected routes
router.post("/articles", articleController.createArticle);
router.post("/favorites/:id", articleController.toggleFavorite);
router.delete("/favorites/:id", articleController.toggleFavorite);
router.get("/favorites/:id", articleController.checkFavorite);

module.exports = router;
