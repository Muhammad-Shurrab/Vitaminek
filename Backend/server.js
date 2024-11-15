const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/authRoutes");
const productRoutes = require("./Routes/productRoutes");
const ratingRoutes = require("./Routes/ratingRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const configRoutes = require("./Routes/configRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");

const articlesRoutes = require("./Routes/articlesRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const profileRoutes = require("./Routes/profileRoutes");
const connectDB = require("./config/db");
connectDB(process.env.MONGO_LINK);
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // The specific origin of your frontend app
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
  })
);
app.use(cookieParser());

//Routes

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/config", configRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/rating", ratingRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Your server running at ${PORT}`);
});
