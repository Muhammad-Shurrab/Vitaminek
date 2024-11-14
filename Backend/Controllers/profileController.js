const User = require("../models/User");
const Order = require("../models/Order");
const Article = require("../models/Articles");
const bcrypt = require("bcrypt");

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password").lean();

    // Get user's orders with populated product details
    const orders = await Order.find({ user: req.user.id })
      .populate({
        path: "products.product",
        select: "name image description",
      })
      .sort({ createdAt: -1 });

    // Get user's favorited articles
    const favoritedArticles = await Article.find({
      _id: { $in: user.favoriteArticles || [] },
    }).lean();

    res.status(200).json({
      success: true,
      data: {
        user,
        orders,
        favoritedArticles,
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email, address, phoneNumber } = req.body;
    const updateData = {
      name,
      email,
      address,
      phoneNumber,
    };

    if (req.file) {
      updateData.photo = req.file.path;
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Current password is incorrect",
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate({
        path: "products.product",
        select: "name image description",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};
