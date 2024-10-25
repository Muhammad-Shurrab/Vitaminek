// const mongoose = require("mongoose");
// const Comments = require("./Comments");
// const Schema = mongoose.Schema;

// const ArticlesSchema = new Schema(
//   {
//     title: { type: String, required: true },
//     photo: { type: String },
//     category: {
//       type: String,
//       required: true,
//     },
//     content: { type: String, required: true },
//     author: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     comments: [
//       { type: Schema.Types.ObjectId, ref: "Comments", required: true },
//     ],
//     ratings: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: "Rating",
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Articles = mongoose.model("Article", ArticlesSchema);

// module.exports = Articles;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Health", "Food", "Lifestyle", "Nutrition", "Fitness"],
  },
  tags: [
    {
      type: String,
    },
  ],
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  views: {
    type: Number,
    default: 0,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update timestamp on save
ArticleSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Article =
  mongoose.models.Article || mongoose.model("Article", ArticleSchema);
module.exports = Article;
