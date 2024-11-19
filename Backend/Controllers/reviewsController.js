const Review = require("../Models/Review");
const Product = require("../Models/Product");

exports.createReview = async (req, res) => {
  try {
    const { product, rating } = req.body;
    const user = req.user.id; // Assuming you have user auth middleware

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ user, product });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    const review = new Review({
      user: req.user.id,
      product,
      rating,
    });

    await review.save();

    // Update product average rating
    const reviews = await Review.find({ product, isBanned: false });
    const avgRating =
      reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length;
    await Product.findByIdAndUpdate(product, {
      rating: avgRating,
      reviewsCount: reviews.length,
    });

    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name"
    );

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: "Error creating review", error });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({
      product: productId,
      isBanned: false,
    })
      .populate("user", "name")
      .sort("-createdAt");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};
