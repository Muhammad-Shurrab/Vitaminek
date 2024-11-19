const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user making the comment
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // Reference to the product
    content: { type: String, required: true }, // The comment text
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // Users who liked the comment
    isBanned: { type: Boolean, default: false }, // Flag to indicate if the comment is banned
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

module.exports = Comment;
