import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Spinner,
} from "@material-tailwind/react";
// import {  } from "@heroicons/react/solid"; // Importing the Heart icon from Heroicons

const ArticlesPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ["Health", "Food", "Lifestyle", "Nutrition", "Fitness"];

  useEffect(() => {
    fetchArticles();
  }, [searchParams]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/articles?${searchParams.toString()}`
      );
      setArticles(response.data.articles);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
    [];
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    if (search) {
      searchParams.set("search", search);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  const handleCategoryFilter = (category) => {
    if (searchParams.get("category") === category) {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleViewArticle = (id) => {
    navigate(`/articles/${id}`);
  };
  return (
    <div className="container mx-auto px-4 py-8">
      <Typography variant="h3" className="font-bold mb-8">
        Favorited Articles
      </Typography>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <Input
          type="search"
          placeholder="Search articles..."
          className="max-w-md"
          onChange={handleSearch}
          value={searchParams.get("search") || ""}
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={
                searchParams.get("category") === category
                  ? "filled"
                  : "outlined"
              }
              onClick={() => handleCategoryFilter(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Card key={article._id} className="overflow-hidden">
            <div className="relative pb-[56.25%]">
              <img
                src={article.coverImage}
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button className="absolute top-2 right-2 text-red-500"></button>
            </div>

            <CardBody>
              <Typography variant="h5" className="font-semibold mb-2">
                {article.title}
              </Typography>
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                {article.category}
              </span>
            </CardBody>

            <CardFooter>
              <Button
                className="w-full"
                variant="outlined"
                onClick={() => handleViewArticle(article.slug)}
              >
                View Article
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner />
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              variant={
                parseInt(searchParams.get("page") || "1") === i + 1
                  ? "filled"
                  : "outlined"
              }
              onClick={() => {
                searchParams.set("page", (i + 1).toString());
                setSearchParams(searchParams);
              }}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;
