const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./Routes/authRoutes");
const productRoutes = require("./Routes/productRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const orderRoutes = require("./Routes/orderRoutes");
const configRoutes = require("./Routes/configRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");
const userRoutes = require("./Routes/userRoutes");
const adminRoutes = require("./Routes/adminRoutes");
const dashUserRoutes = require("./Routes/userRoutes");
const productDashRoutes = require("./Routes/productDashRoutes");
const orderDashRoutes = require("./Routes/orderDashRoutes");
const profileRoutes = require("./Routes/profileRoutes");
const articlesRoutes = require("./Routes/articlesRoutes");
const reviewsRoutes = require("./Routes/reviewsRoutes");
const commentsRoutes = require("./Routes/commentsRoutes");
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
app.use("/api/user", profileRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/comments", commentsRoutes);
app.use("/api/dash", dashUserRoutes);
app.use("/api/dash/products", productDashRoutes);
app.use("/api/dash/orders", orderDashRoutes);
app.use("/api/products", productRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/config", configRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use("/api/payment", paymentRoutes);

app.listen(PORT, () => {
  console.log(`Your server running at ${PORT}`);
});
