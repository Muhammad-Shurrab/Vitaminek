const User = require("../Models/User");
const Article = require("../Models/Articles");
const Order = require("../Models/Order");

const profileController = {
  // Get user profile with related data
  async getProfile(req, res) {
    try {
      const userId = req.user.id; // Assuming you have authentication middleware
      console.log("EEEEEEEEEEEEEE", userId);
      const user = await User.findById(userId)
        .select("-password")
        .populate("purchasedProducts");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Get user's articles
      const articles = await Article.find({ author: userId })
        .sort({ createdAt: -1 })
        .select("title coverImage category views createdAt status");

      // Get user's orders
      const orders = await Order.find({ user: userId })
        .sort({ createdAt: -1 })
        .populate("products.product");

      res.json({
        user,
        articles,
        orders,
        statistics: {
          totalArticles: articles.length,
          totalOrders: orders.length,
          totalSpent: orders.reduce((sum, order) => sum + order.totalAmount, 0),
          publishedArticles: articles.filter((a) => a.status === "published")
            .length,
        },
      });
    } catch (error) {
      console.error("Profile fetch error:", error);
      res.status(500).json({ message: "Error fetching profile data" });
    }
  },

  // Update user profile
  async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const { name, phoneNumber, address, photo } = req.body;

      // Validation
      if (name && name.length < 2) {
        return res
          .status(400)
          .json({ message: "Name must be at least 2 characters long" });
      }

      const updates = {
        name,
        phoneNumber,
        address,
        photo,
      };

      // Remove undefined fields
      Object.keys(updates).forEach(
        (key) => updates[key] === undefined && delete updates[key]
      );

      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updates },
        {
          new: true,
          runValidators: true,
          select: "-password",
        }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(updatedUser);
    } catch (error) {
      console.error("Profile update error:", error);
      if (error.code === 11000) {
        return res.status(400).json({ message: "This name is already taken" });
      }
      res.status(500).json({ message: "Error updating profile" });
    }
  },

  // Get user's article dashboard
  async getArticleDashboard(req, res) {
    try {
      const userId = req.user.id;
      const { status, page = 1, limit = 10 } = req.query;

      const query = { author: userId };
      if (status) {
        query.status = status;
      }

      const articles = await Article.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select("title coverImage category views createdAt status");

      const totalArticles = await Article.countDocuments(query);

      res.json({
        articles,
        pagination: {
          total: totalArticles,
          pages: Math.ceil(totalArticles / limit),
          currentPage: page,
        },
      });
    } catch (error) {
      console.error("Article dashboard error:", error);
      res.status(500).json({ message: "Error fetching article dashboard" });
    }
  },

  // Get user's order history
  async getOrderHistory(req, res) {
    try {
      const userId = req.user.id;
      const { page = 1, limit = 10, status } = req.query;

      const query = { user: userId };
      if (status) {
        query.orderStatus = status;
      }

      const orders = await Order.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate("products.product", "title photo");

      const totalOrders = await Order.countDocuments(query);

      res.json({
        orders,
        pagination: {
          total: totalOrders,
          pages: Math.ceil(totalOrders / limit),
          currentPage: page,
        },
      });
    } catch (error) {
      console.error("Order history error:", error);
      res.status(500).json({ message: "Error fetching order history" });
    }
  },
};

module.exports = profileController;
