const Rating = require("../models/Rating");

// Add or Update Rating
const addOrUpdateRating = async (req, res) => {
  const { userId, targetId, rating, type } = req.body;

  try {
    // Check if the user already rated this target
    let userRating = await Rating.findOne({ userId, targetId, type });

    if (userRating) {
      // Update the existing rating
      userRating.rating = rating;
      await userRating.save();
    } else {
      // Create a new rating
      userRating = new Rating({ userId, targetId, rating, type });
      await userRating.save();
    }

    // Recalculate the average rating
    const ratings = await Rating.find({ targetId, type });

    const avgRating =
      ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;

    res
      .status(200)
      .json({ success: true, avgRating, totalReviews: ratings.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { addOrUpdateRating };
