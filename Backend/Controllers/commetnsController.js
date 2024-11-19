const Comment = require("../Models/Comment");

exports.createComment = async (req, res) => {
  try {
    const { product, content } = req.body;
    const user = req.user.id; // Assuming you have user auth middleware

    console.log("Toji", user);

    const comment = new Comment({
      user,
      product,
      content,
    });

    await comment.save();

    const populatedComment = await Comment.findById(comment._id).populate(
      "user",
      "name"
    );

    res.status(201).json(populatedComment);
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
};

exports.getProductComments = async (req, res) => {
  try {
    const { productId } = req.params;
    const comments = await Comment.find({
      product: productId,
      isBanned: false,
    })
      .populate("user", "name")
      .sort("-createdAt");

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

exports.likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user._id;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const likeIndex = comment.likes.indexOf(userId);

    if (likeIndex > -1) {
      // Unlike
      comment.likes.splice(likeIndex, 1);
    } else {
      // Like
      comment.likes.push(userId);
    }

    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error liking comment", error });
  }
};
