const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    const url = process.env.MONGO_LINK;
    console.log("Loaded Link to the DB:", url);

    // Connect to MongoDB
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error in connection with the database:", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
