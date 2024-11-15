const User = require("../Models/User");

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users.", error });
  }
};

// Toggle user status
exports.toggleUserStatus = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    user.isBanned = !user.isBanned;
    await user.save();
    res.status(200).json({ message: "User status updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to update user status.", error });
  }
};
