// controllers/adminController.js
const User = require("../Models/User");
const Product = require("../Models/Product");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalTraders, products] =
      await Promise.all([
        User.countDocuments(),
        Product.countDocuments(),
        User.countDocuments({ role: "trader" }),
        Product.find().select("price"),
      ]);

    // Calculate total revenue from all products
    const totalRevenue = products.reduce(
      (sum, product) => sum + product.price,
      0
    );

    res.json({
      totalUsers,
      totalProducts,
      totalTraders,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  // Check if the user making the request is an admin
  console.log("Hashim", req.user);
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  try {
    // Fetch all users, excluding sensitive fields, and sorting by creation date
    const users = await User.find()
      .select("-password -googleId")
      .sort("-createdAt");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.banUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { reason } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle ban status
    user.isBanned = !user.isBanned;
    await user.save();

    // Send email notification
    const emailText = user.isBanned
      ? `Your account has been banned for the following reason: ${reason}`
      : "Your account has been unbanned. You can now access your account again.";

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: user.email,
      subject: `Account Status Update - ${
        user.isBanned ? "Banned" : "Unbanned"
      }`,
      text: emailText,
    });

    res.json({
      message: `User ${user.isBanned ? "banned" : "unbanned"} successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort("-createdAt");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    await Product.findByIdAndDelete(productId);
    res.json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
