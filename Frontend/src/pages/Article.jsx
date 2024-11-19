import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, HeartOff, Star, Send, ThumbsUp, Flag } from "lucide-react";
import axios from "axios";

// Helper to fetch token from cookies
const getCookie = (name) => {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return decodeURIComponent(value);
  }
  return null;
};

// Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
  },
});

const ArticlePage = () => {
  const { id } = useParams(); // Use id instead of slug
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  // Get user from localStorage or context
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchArticle();
    if (user) {
      checkIfFavorite();
    }
  }, [id]); // Use id instead of slug

  const fetchArticle = async () => {
    try {
      const [articleRes, commentsRes] = await Promise.all([
        api.get(`/articles/${id}`), // Use id instead of slug
        api.get(`/comments/${id}`),
      ]);
      setArticle(articleRes.data);
      setComments(commentsRes.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch article. Please try again later.");
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const response = await api.get(`/favorites/${id}`); // Use id instead of slug
      setIsFavorite(response.data.isFavorite);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      setError("Please login to favorite articles.");
      return;
    }

    try {
      const response = isFavorite
        ? await api.delete(`/favorites/${id}`) // Use id
        : await api.post(`/favorites/${id}`, {});
      setIsFavorite(response.data.isFavorite);
    } catch (error) {
      setError("Failed to toggle favorite.");
    }
  };

  const submitComment = async () => {
    if (!user) {
      setError("Please login to comment.");
      return;
    }

    try {
      const response = await api.post("/comments", {
        articleId: id, // Pass id
        content: commentText,
      });
      setComments([response.data, ...comments]);
      setCommentText("");
    } catch (error) {
      setError("Failed to submit comment.");
    }
  };

  const submitRating = async () => {
    if (!user) {
      setError("Please login to rate.");
      return;
    }

    try {
      await api.post("/reviews", {
        articleId: id, // Pass id
        rating,
      });
      fetchArticle(); // Refresh article to reflect updated ratings
    } catch (error) {
      setError("Failed to submit rating.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );

  if (!article)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Article not found
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
          role="alert"
        >
          {error}
          <button onClick={() => setError(null)} className="float-right">
            &times;
          </button>
        </div>
      )}

      <div className="mb-8">
        <div className="flex justify-between items-start">
          <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
          <button
            onClick={toggleFavorite}
            className="text-red-500 hover:text-red-600"
          >
            {isFavorite ? (
              <Heart className="fill-current" size={24} />
            ) : (
              <HeartOff size={24} />
            )}
          </button>
        </div>

        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        <div className="flex items-center gap-4 mb-6">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            {article.category}
          </span>
          <span className="text-gray-500">
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="prose max-w-none">{article.content}</div>
      </div>

      {/* Rating Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold mb-4">Rate this article</h3>
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              <Star
                className={rating >= star ? "fill-current" : ""}
                size={24}
              />
            </button>
          ))}
        </div>
        <button
          onClick={submitRating}
          disabled={!rating}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
        >
          Submit Rating
        </button>
      </div>

      {/* Comments Section */}
      <div>
        <h3 className="text-2xl font-semibold mb-4">Comments</h3>
        <div className="mb-6">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write your comment..."
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
          />
          <button
            onClick={submitComment}
            disabled={!commentText.trim()}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 disabled:bg-gray-300"
          >
            <Send size={16} />
            Submit Comment
          </button>
        </div>

        <div className="space-y-4">
          {comments.length ? (
            comments.map((comment) => (
              <div key={comment._id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-gray-500">
                      {comment.user.name} •{" "}
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-1">{comment.content}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-blue-500 hover:text-blue-600">
                      <ThumbsUp size={16} />
                    </button>
                    <button className="text-red-500 hover:text-red-600">
                      <Flag size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
