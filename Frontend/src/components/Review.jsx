import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  Card,
  CardBody,
  Typography,
  Rating,
  Button,
  Textarea,
  IconButton,
} from "@material-tailwind/react";
import { ThumbsUp, Flag, Star, Send, Trash2 } from "lucide-react";
import axios from "axios";

const ReviewComments = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get current user from your auth system
  const token = Cookies.get("token");
  const currentUser = token ? JSON.parse(atob(token.split(".")[1])) : null;

  useEffect(() => {
    fetchReviewsAndComments();
  }, [productId]);

  const fetchReviewsAndComments = async () => {
    try {
      setLoading(true);
      const [reviewsRes, commentsRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/reviews/${productId}`),
        axios.get(`http://localhost:5000/api/comments/${productId}`),
      ]);

      setReviews(reviewsRes.data);
      setComments(commentsRes.data);
    } catch (err) {
      setError("Failed to fetch reviews and comments");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    if (!currentUser) {
      setError("Please login to submit a review");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reviews",
        {
          product: productId,
          rating: userRating,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setReviews([...reviews, response.data]);
      setUserRating(0);
    } catch (err) {
      setError("Failed to submit review");
      console.error(err);
    }
  };

  const submitComment = async () => {
    if (!currentUser || !commentText.trim()) {
      setError("Please login and enter a comment");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/comments",
        {
          product: productId,
          content: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments([...comments, response.data]);
      setCommentText("");
    } catch (err) {
      setError("Failed to submit comment");
      console.error(err);
    }
  };

  const handleLikeComment = async (commentId) => {
    if (!currentUser) {
      setError("Please login to like comments");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/comments/${commentId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update comments state to reflect the new like
      const updatedComments = comments.map((comment) =>
        comment._id === commentId
          ? {
              ...comment,
              likes: comment.likes.includes(currentUser._id)
                ? comment.likes.filter((id) => id !== currentUser._id)
                : [...comment.likes, currentUser._id],
            }
          : comment
      );
      setComments(updatedComments);
    } catch (err) {
      setError("Failed to like comment");
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* ... UI rendering remains unchanged */}
      {/* Reviews Section */}
      <Card>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Reviews
          </Typography>

          {/* Add Review Section */}
          {currentUser && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Rating
                  value={userRating}
                  onChange={(value) => setUserRating(value)}
                  ratedIcon={
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  }
                  unratedIcon={<Star className="w-6 h-6 text-gray-300" />}
                />
              </div>
              <Button
                onClick={submitReview}
                disabled={!userRating}
                className="mt-2"
                color="blue"
              >
                Submit Review
              </Button>
            </div>
          )}

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border-b pb-4">
                <div className="flex items-center gap-2">
                  <Rating
                    value={review.rating}
                    readonly
                    ratedIcon={
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    }
                    unratedIcon={<Star className="w-5 h-5 text-blue-300" />}
                  />
                  <Typography color="blue" className="text-sm">
                    by {review.user.name} •{" "}
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Comments Section */}
      <Card>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-4">
            Comments
          </Typography>

          {/* Add Comment Section */}
          {currentUser && (
            <div className="mb-6">
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write your comment..."
                className="mb-2"
              />
              <Button
                onClick={submitComment}
                disabled={!commentText.trim()}
                className="flex items-center gap-2"
                color="blue"
              >
                <Send className="w-4 h-4" />
                Submit Comment
              </Button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment._id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Typography color="gray" className="text-sm mb-1">
                      {comment.user.name} •{" "}
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography>{comment.content}</Typography>
                  </div>
                  <div className="flex gap-2">
                    <IconButton
                      variant="text"
                      color="blue"
                      onClick={() => handleLikeComment(comment._id)}
                      className={
                        currentUser && comment.likes.includes(currentUser._id)
                          ? "text-blue-500"
                          : ""
                      }
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="ml-1 text-sm">
                        {comment.likes.length}
                      </span>
                    </IconButton>
                    <IconButton variant="text" color="red">
                      <Flag className="w-4 h-4" />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
          <button
            className="absolute top-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewComments;
