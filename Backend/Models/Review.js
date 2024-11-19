const mongoose = require("mongoose");
const { Schema } = mongoose;
const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user making the review
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Reference to the product
    rating: {
      type: Number,
      required: true,
      min: 1, // Minimum rating
      max: 5, // Maximum rating
    },

    isBanned: { type: Boolean, default: false }, // Flag to indicate if the review is banned
  },
  { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

module.exports = Review;
