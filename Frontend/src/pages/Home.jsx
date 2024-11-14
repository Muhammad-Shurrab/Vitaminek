import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import axios from "axios";
import {
  Typography,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

const SliderButton = ({ direction, onClick, className }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg z-10 transition-all ${className}`}
  >
    {direction === "left" ? (
      <ChevronLeftIcon className="w-6 h-6" />
    ) : (
      <ChevronRightIcon className="w-6 h-6" />
    )}
  </button>
);

const ProductSliderSection = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsToShow >= products.length ? 0 : prev + itemsToShow
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsToShow < 0
        ? Math.max(0, products.length - itemsToShow)
        : prev - itemsToShow
    );
  };

  if (!products?.length) {
    return <div>Loading products...</div>;
  }

  return (
    <motion.div
      className="relative overflow-hidden py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <SliderButton direction="left" onClick={prevSlide} className="left-2" />
      <SliderButton direction="right" onClick={nextSlide} className="right-2" />

      <motion.div
        className="flex gap-6"
        animate={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            className="flex-none w-[calc(33.333%-16px)]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Card className="w-full">
              <CardHeader shadow={false} floated={false} className="h-64">
                <img
                  src={product.photos || "/placeholder-product.jpg"}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" className="mb-2">
                  {product.title}
                </Typography>
                <Typography color="blue-gray" className="font-medium">
                  ${product.price}
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={`/products/${product._id}`}>
                  <Button
                    fullWidth
                    className="bg-blue-500 text-white shadow-none hover:shadow-lg"
                  >
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const ArticleSliderSection = ({ articles }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 2;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsToShow >= articles.length ? 0 : prev + itemsToShow
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - itemsToShow < 0
        ? Math.max(0, articles.length - itemsToShow)
        : prev - itemsToShow
    );
  };

  if (!articles?.length) {
    return <div>Loading articles...</div>;
  }

  return (
    <motion.div
      className="relative overflow-hidden py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
    >
      <SliderButton direction="left" onClick={prevSlide} className="left-2" />
      <SliderButton direction="right" onClick={nextSlide} className="right-2" />

      <motion.div
        className="flex gap-6"
        animate={{ x: `-${currentIndex * (100 / itemsToShow)}%` }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {articles.map((article) => (
          <motion.div
            key={article._id}
            className="flex-none w-[calc(50%-12px)]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Card className="w-full">
              <CardHeader shadow={false} floated={false} className="h-72">
                <img
                  src={article.coverImage || "/placeholder-article.jpg"}
                  alt={article.title}
                  className="h-full w-full object-cover"
                />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" className="font-semibold mb-2">
                  {article.title}
                </Typography>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {article.category}
                </span>
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={`/articles/${article._id}`}>
                  <Button
                    fullWidth
                    variant="outlined"
                    className="hover:bg-blue-50"
                  >
                    Read Article
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

const Home = () => {
  const [openAccordion, setOpenAccordion] = useState(1);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch featured products
        const productsResponse = await axios.get(
          "http://localhost:5000/api/products",
          {
            params: {
              featured: true,
              limit: 6,
            },
          }
        );
        setProducts(productsResponse.data);

        // Fetch featured articles
        const articlesResponse = await axios.get(
          "http://localhost:5000/api/articles",
          {
            params: {
              featured: true,
              limit: 4,
            },
          }
        );
        console.log("Articles:", articlesResponse.data.articles);
        setArticles(articlesResponse.data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenAccordion = (value) => {
    setOpenAccordion(openAccordion === value ? 0 : value);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <motion.section
        className=" text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

            <section className="overflow-hidden w-full bg-[url(https://t4.ftcdn.net/jpg/05/95/66/21/360_F_595662120_tLwPJHa9uFqAkbyK689e2Ya36NMzbdM8.webp)] bg-cover bg-top bg-no-repeat">
              <div className="bg-black/50 p-8 md:p-12 lg:px-16 lg:py-24">
                <div className="text-center ltr:sm:text-left rtl:sm:text-right">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
                    Vitaminek
                  </h2>

                  <p className="hidden max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
                    Welcome to Vitaminek, a comprehensive platform dedicated to
                    promoting health and wellness. Our mission is to empower
                    individuals to make informed decisions about their nutrition
                    and lifestyle choices.
                  </p>

                  <div className="mt-4 sm:mt-8">
                    <Link
                      to={"products"}
                      className="inline-block rounded-full bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-yellow-400"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Products Slider */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Typography
            variant="h2"
            className="title relative  font-bold text-center mb-8 before after mt-36"
          >
            Featured Products
          </Typography>
          <ProductSliderSection products={products} />
        </div>
      </section>

      {/* Featured Articles Slider */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto px-4">
          <Typography
            variant="h2"
            className="title relative  font-bold text-center mb-8 before after mt-36"
          >
            Latest Articles
          </Typography>
          <ArticleSliderSection articles={articles} />
        </div>
      </section>

      {/* Rest of the sections remain the same */}
      {/* Testimonials and FAQ sections... */}
    </div>
  );
};

export default Home;
