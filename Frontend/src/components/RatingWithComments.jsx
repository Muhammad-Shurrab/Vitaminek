import React, { useState, useEffect } from "react";
import axios from "axios";
import { Typography, Rating } from "@material-tailwind/react";
// import jwt_decode from "jwt-decode";

export default function RatingWithComments({ targetId, type }) {
  const [rated, setRated] = useState(4);
  const [averageRating, setAverageRating] = useState(4.7); // Example initial value
  const [totalReviews, setTotalReviews] = useState(134); // Example initial value
  const [userId, setUserId] = useState(null);

  // Decode JWT to get userId when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
    if (token) {
      const decoded = jwt_decode(token);
      setUserId(decoded.userId); // Extract userId from decoded token
    }
  }, []);

  // Function to handle rating change
  const handleRatingChange = async (newRating) => {
    setRated(newRating);

    try {
      const response = await axios.post("/api/rate", {
        userId, // Use the actual userId from state
        targetId,
        rating: newRating,
        type,
      });

      const { avgRating, totalReviews } = response.data;
      setAverageRating(avgRating);
      setTotalReviews(totalReviews);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
      {averageRating.toFixed(1)}
      <Rating value={rated} onChange={handleRatingChange} />
      <Typography color="blue-gray" className="font-medium text-blue-gray-500">
        Based on {totalReviews} Reviews
      </Typography>
    </div>
  );
}
