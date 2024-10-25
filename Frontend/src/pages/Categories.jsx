import React, { useEffect, useState } from "react";
import axios from "axios";
import EcommerceCard from "../components/Card";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function Categories() {
  const [products, setProducts] = useState([{}]); // State to hold fetched products
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/"); // Replace this with your actual API endpoint
        setProducts(response.data);
        setFilteredProducts(response.data); // Initially, all products are shown
        console.log("Gojo", response.data); // Log the response data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts(); // Call the fetch function
  }, []);

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter products based on the search term (name, category, or description)
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(value) ||
        product.category.toLowerCase().includes(value) ||
        product.description.toLowerCase().includes(value)
    );

    setFilteredProducts(filtered); // Update the filtered products state
  };

  return (
    <>
      <h2 className="title relative text-2xl font-bold text-center mb-8 mt-36">
        All Products
      </h2>
      <form className="max-w-md mx-auto">
        <div className="relative">
          <input
            type="search"
            id="default-search"
            value={searchTerm}
            onChange={handleInputChange}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Products..."
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      <div className="7aden flex justify-around">
        <Sidebar className="row-start-1 row-end-2 max-w-12" />
        <div className="products grid grid-cols-3 gap-16 justify-center items-center p-10 pt-7 pr-20">
          {products.length > 0 ? (
            products.map((product) => (
              <Card key={product._id} className="w-80 card-item group">
                <CardHeader shadow={false} floated={false} className="h-96">
                  <img
                    src={product.photos}
                    alt={product.title}
                    className="h-full w-full object-cover rounded-lg mb-2"
                  />
                </CardHeader>
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography color="blue-gray" className="font-bold">
                      {product.title}
                    </Typography>
                    <Typography color="blue-gray" className="font-medium">
                      ${product.price}
                    </Typography>
                  </div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="opacity-75 text-base"
                  >
                    {product.description}
                  </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                  <Link to={`/products/${product._id}`}>
                    <Button
                      ripple={false}
                      fullWidth={true}
                      className="bg-light-blue-500 text-white"
                    >
                      View The Product
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Categories;
