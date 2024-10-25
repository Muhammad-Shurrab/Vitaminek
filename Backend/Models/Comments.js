const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  photo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  text: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["product", "article"], // To specify if the comment is for a recipe or dish
  },

  targetId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  rating: { type: Schema.Types.ObjectId, ref: "Rating" },
  createdAt: { type: Date, default: Date.now },
  replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

const Comments =
  mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
module.exports = Comments;
