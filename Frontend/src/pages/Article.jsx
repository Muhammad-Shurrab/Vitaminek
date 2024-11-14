import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  Button,
  Textarea,
  IconButton,
} from "@material-tailwind/react";
import { Heart, Share2, BookmarkPlus, MessageCircle, Star } from "lucide-react";

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [comments, setComments] = useState([]);
  const [currentRating, setCurrentRating] = useState(null);

  useEffect(() => {
    fetchArticle();
    fetchComments();
    fetchUserRating();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/articles/${id}`
      );
      setArticle(response.data.data);
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/comments`, {
        params: {
          targetId: id,
          type: "article",
        },
      });
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const fetchUserRating = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/ratings/user`,
        {
          params: {
            targetId: id,
            type: "article",
          },
        }
      );
      if (response.data) {
        setCurrentRating(response.data.rating);
        setRating(response.data.rating);
      }
    } catch (error) {
      console.error("Error fetching user rating:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/comments`, {
        text: comment,
        targetId: id,
        type: "article",
      });
      setComments([...comments, response.data]);
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleRatingSubmit = async () => {
    try {
      const ratingData = {
        rating,
        targetId: id,
        type: "article",
      };

      if (currentRating) {
        await axios.put(
          `http://localhost:5000/api/ratings/${currentRating._id}`,
          ratingData
        );
      } else {
        await axios.post(`http://localhost:5000/api/ratings`, ratingData);
      }

      // Refresh article data to get updated ratings
      fetchArticle();
      fetchUserRating();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative h-[60vh] mb-8 rounded-xl overflow-hidden">
        <img
          src={article.photo || "/placeholder-image.jpg"}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <Typography
            variant="h1"
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            {article.title}
          </Typography>
          <div className="flex items-center gap-4">
            <span className="bg-blue-500 px-3 py-1 rounded-full text-sm">
              {article.category}
            </span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardBody>
              <Typography className="prose max-w-none">
                {article.content}
              </Typography>
            </CardBody>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardBody>
              <Typography variant="h4" className="mb-4">
                Comments
              </Typography>
              <form onSubmit={handleCommentSubmit} className="mb-6">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="mb-2"
                />
                <Button type="submit">Post Comment</Button>
              </form>
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment._id} className="bg-gray-50">
                    <CardBody>
                      <div className="flex items-center gap-2 mb-2">
                        {comment.photo && (
                          <img
                            src={comment.photo}
                            alt="User"
                            className="w-8 h-8 rounded-full"
                          />
                        )}
                        <Typography variant="h6">
                          {comment.userId?.name}
                        </Typography>
                      </div>
                      <Typography>{comment.text}</Typography>
                      <Typography variant="small" color="gray" className="mt-2">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </Typography>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Rating Section */}
          <Card>
            <CardBody>
              <Typography variant="h5" className="mb-4">
                Rate this article
              </Typography>
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`cursor-pointer ${
                      value <= rating ? "fill-yellow-500 stroke-yellow-500" : ""
                    }`}
                    onClick={() => setRating(value)}
                  />
                ))}
              </div>
              <Button onClick={handleRatingSubmit} fullWidth>
                {currentRating ? "Update Rating" : "Submit Rating"}
              </Button>
            </CardBody>
          </Card>

          {/* Author Info */}
          <Card>
            <CardBody>
              <Typography variant="h5" className="mb-4">
                About the Author
              </Typography>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full" />
                <div>
                  <Typography variant="h6">{article.author?.name}</Typography>
                  <Typography variant="small" color="gray">
                    Author
                  </Typography>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
