const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const RatingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["product", "article"], // To specify if the rating is for a recipe or dish
    },

    targetId: {
      type: Schema.Types.ObjectId,
      required: true, // Reference to either Recipe or Dish
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
