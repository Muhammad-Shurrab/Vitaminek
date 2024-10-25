const express = require("express");
const { addOrUpdateRating } = require("../Controllers/ratingController");

const router = express.Router();

// POST route to add/update rating
router.post("/rate", addOrUpdateRating);

module.exports = router;
