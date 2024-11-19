// controllers/articleController.js
const Article = require("../Models/Articles");
const User = require("../Models/User");

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "published" })
      .populate("author", "name")
      .sort("-createdAt");

    res.status(200).json(articles);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching articles", error: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("author", "name") // Populate author details if necessary
      .exec();

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching article" });
  }
};
exports.createArticle = async (req, res) => {
  try {
    const { title, content, category, tags, coverImage } = req.body;

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

    const article = new Article({
      title,
      content,
      category,
      tags,
      coverImage,
      slug,
      author: req.user._id, // Assuming you have user auth middleware
      status: "published",
    });

    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating article", error: error.message });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const { articleId } = req.body;
    const userId = req.user._id; // Assuming you have user auth middleware

    const user = await User.findById(userId);
    const favoriteIndex = user.favorites.indexOf(articleId);

    if (favoriteIndex === -1) {
      user.favorites.push(articleId);
    } else {
      user.favorites.splice(favoriteIndex, 1);
    }

    await user.save();
    res.status(200).json({ message: "Favorite toggled successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error toggling favorite", error: error.message });
  }
};

exports.toggleFavorite = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user.id;

    const article = await Article.findOne({ slug });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const user = await User.findById(userId);
    const favoriteIndex = user.favorites.indexOf(article._id);

    if (favoriteIndex > -1) {
      user.favorites.splice(favoriteIndex, 1);
      await user.save();
      res.json({ isFavorite: false });
    } else {
      user.favorites.push(article._id);
      await user.save();
      res.json({ isFavorite: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Error toggling favorite", error });
  }
};

exports.checkFavorite = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.user.id;

    const article = await Article.findOne({ slug });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const user = await User.findById(userId);
    const isFavorite = user.favorites.includes(article._id);

    res.json({ isFavorite });
  } catch (error) {
    res.status(500).json({ message: "Error checking favorite status", error });
  }
};
