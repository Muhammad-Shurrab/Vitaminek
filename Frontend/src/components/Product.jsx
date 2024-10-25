import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Button,
  IconButton,
  Select,
  Option,
} from "@material-tailwind/react";
import { Heart } from "lucide-react"; // Import the Heart icon from lucide-react
import Rating from "../components/RatingWithComments";

function ProductDetails() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState({}); // State to hold the product data
  const [selectedSize, setSelectedSize] = useState(""); // State for selected size
  const [selectedFlavour, setSelectedFlavour] = useState(""); // State for selected flavour
  const [quantity, setQuantity] = useState(1); // State for quantity

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setProduct(response.data); // Store the fetched product data
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct(); // Call the fetch function
  }, [id]); // Trigger the effect when the product ID changes

  const handleAddToCart = async () => {
    try {
      // Prepare the payload
      const payload = {
        productId: id,
        quantity: quantity,
        size: selectedSize,
        flavour: selectedFlavour,
      };

      // Make a POST request to add the product to the cart
      const response = await axios.post(
        "http://localhost:5000/api/cart/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the token if using authentication
          },
        }
      );

      // Handle success response (e.g., show a success message)
      console.log("Product added to cart:", response.data);
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (!product) {
    return <p>Loading product...</p>; // Show a loading state while fetching data
  }

  return (
    <section className="py-16 px-8">
      <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
        <img
          src={product.photos} // Use dynamic image URL
          alt={product.title} // Use dynamic title for alt text
          className="h-[36rem]"
        />
        <div>
          <Typography className="mb-4 text-light-blue-500" variant="h3">
            {product.title} {/* Use dynamic title */}
          </Typography>
          <Typography variant="h5" className="text-light-blue-500">
            {/* Use dynamic price */}${product.price}
          </Typography>
          <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
            {product.description} {/* Use dynamic description */}
          </Typography>
          <div className="my-8 flex items-center gap-2">
            <Rating
              value={product.rating || 5}
              className="text-light-blue-600"
              targetId={id}
              type="product"
            />
            <Typography className="!text-sm font-bold !text-gray-700">
              {product.rating}/5 ({product.reviewsCount} reviews){" "}
              {/* Use dynamic rating and review count */}
            </Typography>
          </div>
          <Typography color="blue-gray" variant="h6">
            Color
          </Typography>
          <div className="my-8 mt-3 flex items-center gap-2">
            <div className="flex w-72 flex-col gap-6">
              {/* Map over available sizes */}
              <Select
                size="xl"
                label="Size"
                color="blue"
                onChange={(e) => setSelectedSize(e)}
              >
                {product.size && product.size.length > 0 ? (
                  product.size.map((size, index) => (
                    <Option key={index} value={size}>
                      {size}
                    </Option>
                  ))
                ) : (
                  <Option>No sizes available</Option>
                )}
              </Select>

              <Select
                size="xl"
                label="Flavours"
                color="blue"
                onChange={(e) => setSelectedFlavour(e)}
              >
                {product.flavour && product.flavour.length > 0 ? (
                  product.flavour.map((flavour, index) => (
                    <Option key={index} value={flavour}>
                      {flavour}
                    </Option>
                  ))
                ) : (
                  <Option>No flavours available</Option>
                )}
              </Select>
            </div>
          </div>
          <div className="mb-4 flex w-full items-center gap-3 md:w-1/2">
            <Button
              color=""
              className="w-52 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-2 hover:border-light-blue-500 transition-transform"
              onClick={handleAddToCart} // Call the function when button is clicked
            >
              Add to Cart
            </Button>
            <IconButton color="blue" variant="text" className="shrink-0">
              <Heart className="h-6 w-6" />{" "}
              {/* Use Heart icon from lucide-react */}
            </IconButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
