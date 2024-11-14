const Article = require("../Models/Articles");

const Comment = require("../Models/Comments");

exports.getArticles = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 8 } = req.query;
    const query = {};

    // Add category filter if provided
    if (category) {
      query.category = category;
    }

    // Add search filter if provided
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    // Only show published articles
    query.status = "published";

    const articles = await Article.find(query)
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Article.countDocuments(query);

    res.json({
      articles,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single article
exports.getArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Create new article

exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);

    res.status(201).json({
      success: true,
      data: article,
    });
    console.log("Articles");
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Update article
exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!article) {
      return res.status(404).json({
        success: false,
        error: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      data: article,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Delete article
exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({
        success: false,
        error: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getArticleComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      targetId: req.params.id,
      type: "article",
    })
      .populate("userId", "name photo")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Add comment to article
exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      userId: req.user._id, // Assuming you have user info in req.user from auth middleware
      text: req.body.text,
      type: "article",
      targetId: req.params.id,
    });

    const populatedComment = await Comment.findById(comment._id).populate(
      "userId",
      "name photo"
    );

    res.status(201).json({
      success: true,
      data: populatedComment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Get user's rating for an article
exports.getUserRating = async (req, res) => {
  try {
    const rating = await Rating.findOne({
      userId: req.user._id,
      targetId: req.params.id,
      type: "article",
    });

    res.status(200).json({
      success: true,
      data: rating,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// Add or update rating
exports.handleRating = async (req, res) => {
  try {
    const { rating } = req.body;

    const existingRating = await Rating.findOne({
      userId: req.user._id,
      targetId: req.params.id,
      type: "article",
    });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
      res.status(200).json({
        success: true,
        data: existingRating,
      });
    } else {
      const newRating = await Rating.create({
        userId: req.user._id,
        rating,
        type: "article",
        targetId: req.params.id,
      });

      res.status(201).json({
        success: true,
        data: newRating,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
