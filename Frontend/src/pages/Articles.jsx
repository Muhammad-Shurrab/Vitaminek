import React, { useState, useEffect } from "react";
import { Search, Heart, HeartOff } from "lucide-react";
import axios from "axios";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [favorites, setFavorites] = useState([]);

  const categories = ["Health", "Food", "Lifestyle", "Nutrition", "Fitness"];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/articles/");
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

  // const toggleFavorite = async (articleId) => {
  //   try {
  //     const isFavorite = favorites.includes(articleId);
  //     if (isFavorite) {
  //       await axios.delete(`http://localhost:5000/api/favorites/${articleId}`);
  //       setFavorites(favorites.filter((id) => id !== articleId));
  //     } else {
  //       await axios.post(`http://localhost:5000/api/favorites`, { articleId });
  //       setFavorites([...favorites, articleId]);
  //     }
  //   } catch (error) {
  //     console.error("Error toggling favorite:", error);
  //   }
  // };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">All Articles</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search
              className="absolute right-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>

          {/* Category Filter */}
          <select
            className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article._id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold mb-2">
                      {article.title}
                    </h2>
                    <button
                      onClick={() => toggleFavorite(article._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      {favorites.includes(article._id) ? (
                        <Heart className="fill-current" size={20} />
                      ) : (
                        <HeartOff size={20} />
                      )}
                    </button>
                  </div>
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                    {article.category}
                  </span>
                  <p className="mt-2 text-gray-600 line-clamp-3">
                    {article.content}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(article.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      onClick={() =>
                        (window.location.href = `/article/${article.slug}`)
                      }
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
