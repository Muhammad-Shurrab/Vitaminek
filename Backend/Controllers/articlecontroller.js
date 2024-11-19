const Article = require("../Models/Article");
const User = require("../Models/User");

exports.getArticleBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const article = await Article.findOne({ slug }).populate("author", "name");

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Increment views
    article.views += 1;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Error fetching article", error });
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
