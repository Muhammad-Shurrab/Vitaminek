const mongoose = require("mongoose");
const { Schema } = mongoose;

const Comment = require("./Comments"); // Ensure you are referencing the correct model

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    photos: [{ type: String }],

    comments: [
      { type: Schema.Types.ObjectId, ref: "Comment", required: true }, // Change ref to "Comment"
    ],
    ratings: [
      {
        type: Schema.Types.ObjectId,
        ref: "Rating",
      },
    ],
    flavour: [{ type: String }],
    size: [{ type: String }],
    quantities: [{ type: Number, default: 1, required: true }],

    traderId: { type: Schema.Types.ObjectId, ref: "User" },
    favorites: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// Use the existing model if already compiled
const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

module.exports = Product;
