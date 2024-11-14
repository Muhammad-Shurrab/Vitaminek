const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../Models/User");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log(req.body);
    // Validate input fields
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please fill in all required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save user to the database
    await user.save();

    // Send success response
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    // Handle any server errors
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error (registerUser)", error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not Found" });

    const validPassword = await bcrypt.compare(password, user.password);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.status(200).json({ role: user.role, userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged Out Successfully" });
};

module.exports = { registerUser, loginUser, logoutUser };
