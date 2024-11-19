import React, { useEffect, useState } from "react";
import axios from "axios";
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
import SearchBar from "../components/SearchBar"; // Import SearchBar component
import Pagination from "../components/Pagination";

function Categories() {
  const [products, setProducts] = useState([]); // State to hold fetched products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to hold filtered products
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [productsPerPage] = useState(6); // Number of products per page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products/");
        setProducts(response.data);
        setFilteredProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / productsPerPage));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleFilter = (filteredProducts) => {
    setFilteredProducts(filteredProducts);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
  };

  const handleSearch = (searchTerm) => {
    const lowerCaseTerm = searchTerm.toLowerCase();
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(lowerCaseTerm) ||
        product.category.toLowerCase().includes(lowerCaseTerm) ||
        product.description.toLowerCase().includes(lowerCaseTerm)
    );

    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / productsPerPage));
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <h2 className="title relative text-2xl font-bold text-center mb-8 mt-36">
        All Products
      </h2>

      <SearchBar onSearch={handleSearch} />

      <div className="7aden flex flex-col lg:flex-row justify-around">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4 mb-8 lg:mb-0">
          <Sidebar products={products} onFilter={handleFilter} />
        </div>

        {/* Products Grid */}
        <div className="products grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <Card key={product._id} className="w-full card-item group">
                <CardHeader shadow={false} floated={false} className="h-80">
                  <img
                    src={product.photos}
                    alt={product.title}
                    className="h-full w-full object-cover rounded-lg mb-2"
                  />
                </CardHeader>
                <CardBody>
                  <div className="mb-2 flex items-center justify-between">
                    <Typography
                      color="blue-gray"
                      className="font-bold text-blue-400"
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      color="blue-gray"
                      className="font-semibold text-lg text-blue-500"
                    >
                      ${product.price}
                    </Typography>
                  </div>
                  <Typography
                    variant="small"
                    color="gray"
                    className="opacity-75 text-sm"
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
            <p className="text-center text-gray-600">No products found.</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination flex justify-center mt-6">
        <Pagination
          active={currentPage}
          setActive={paginate}
          next={() => currentPage < totalPages && paginate(currentPage + 1)}
          prev={() => currentPage > 1 && paginate(currentPage - 1)}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}

export default Categories;
