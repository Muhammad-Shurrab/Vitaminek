const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the User who wrote the review
  type: {
    type: String,
    required: true,
    enum: ["product", "article"], // To specify if the review is for a recipe or dish
  },
  targetId: {
    type: Schema.Types.ObjectId,
    required: true, // Reference to either Recipe or Dish
  },
  review: {
    type: String,
    required: true,
  }, // Review text
  createdAt: {
    type: Date,
    default: Date.now,
  }, // Timestamp for review creation
  updatedAt: {
    type: Date,
    default: Date.now,
  }, // Timestamp for review update
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
