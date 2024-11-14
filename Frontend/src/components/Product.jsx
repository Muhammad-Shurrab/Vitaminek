// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Typography,
//   Button,
//   IconButton,
//   Select,
//   Option,
// } from "@material-tailwind/react";
// import { useDispatch } from "react-redux";
// import { addToCart } from "../Features/cartSlice";
// import { Heart } from "lucide-react"; // Import the Heart icon from lucide-react
// import Rating from "../components/RatingWithComments";

// function ProductDetails() {
//   const { id } = useParams(); // Get the product ID from the URL
//   const [product, setProduct] = useState({}); // State to hold the product data
//   const [selectedSize, setSelectedSize] = useState(""); // State for selected size
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedFlavour, setSelectedFlavour] = useState(""); // State for selected flavour
//   const [quantity, setQuantity] = useState(1); // State for quantity
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/products/${id}`
//         );

//         setProduct(response.data); // Store the fetched product data
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct(); // Call the fetch function
//   }, [id]); // Trigger the effect when the product ID changes

//   const handleAddToCart = async () => {
//     try {
//       // Prepare the payload
//       const payload = {
//         productId: id,
//         title: product.title,
//         photos: product.photos,
//         price: product.price,
//         quantity: quantity,
//         size: selectedSize,
//         flavour: selectedFlavour,
//       };

//       // Dispatch payload to Redux store
//       dispatch(addToCart(payload));
//       // Make a POST request to add the product to the cart on the server
//       const response = await axios.post(
//         "http://localhost:5000/api/cart/add",
//         payload
//       );

//       console.log("Product added to server cart:", response.data);
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//     }
//   };

//   if (!product) {
//     return <p>Loading product...</p>; // Show a loading state while fetching data
//   }

//   return (
//     <section className="py-16 px-8">
//       <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
//         <img
//           src={product.photos} // Use dynamic image URL
//           alt={product.title} // Use dynamic title for alt text
//           className="h-[36rem]"
//         />
//         <div>
//           <Typography className="mb-4 text-light-blue-500" variant="h3">
//             {product.title} {/* Use dynamic title */}
//           </Typography>
//           <Typography variant="h5" className="text-light-blue-500">
//             {/* Use dynamic price */}${product.price}
//           </Typography>
//           <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
//             {product.description} {/* Use dynamic description */}
//           </Typography>
//           <div className="my-8 flex items-center gap-2">
//             <Rating
//               value={product.rating || 5}
//               className="text-light-blue-600"
//               targetId={id}
//               type="product"
//             />
//             <Typography className="!text-sm font-bold !text-gray-700">
//               {product.rating}/5 ({product.reviewsCount} reviews){" "}
//               {/* Use dynamic rating and review count */}
//             </Typography>
//           </div>
//           <Typography color="blue-gray" variant="h6">
//             Color
//           </Typography>
//           <div className="my-8 mt-3 flex items-center gap-2">
//             <div className="flex w-72 flex-col gap-6">
//               {/* Map over available sizes */}
//               <Select
//                 size="xl"
//                 label="Size"
//                 color="blue"
//                 onChange={(e) => setSelectedSize(e)}
//               >
//                 {product.size && product.size.length > 0 ? (
//                   product.size.map((size, index) => (
//                     <Option key={index} value={size}>
//                       {size}
//                     </Option>
//                   ))
//                 ) : (
//                   <Option>No sizes available</Option>
//                 )}
//               </Select>

//               <Select
//                 size="xl"
//                 label="Flavours"
//                 color="blue"
//                 onChange={(e) => setSelectedFlavour(e)}
//               >
//                 {product.flavour && product.flavour.length > 0 ? (
//                   product.flavour.map((flavour, index) => (
//                     <Option key={index} value={flavour}>
//                       {flavour}
//                     </Option>
//                   ))
//                 ) : (
//                   <Option>No flavours available</Option>
//                 )}
//               </Select>
//             </div>
//           </div>
//           <div className="mb-4 flex w-full items-center gap-3 md:w-1/2">
//             <Button
//               color=""
//               className="w-52 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-2 hover:border-light-blue-500 transition-transform"
//               onClick={handleAddToCart} // Call the function when button is clicked
//             >
//               Add to Cart
//             </Button>
//             <IconButton color="blue" variant="text" className="shrink-0">
//               <Heart className="h-6 w-6" />{" "}
//               {/* Use Heart icon from lucide-react */}
//             </IconButton>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProductDetails;

//

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Typography,
//   Button,
//   IconButton,
//   Select,
//   Option,
// } from "@material-tailwind/react";
// import { Heart } from "lucide-react"; // Import the Heart icon from lucide-react
// import Rating from "../components/RatingWithComments";

// function ProductDetails() {
//   const { id } = useParams(); // Get the product ID from the URL
//   const [product, setProduct] = useState({}); // State to hold the product data
//   const [selectedSize, setSelectedSize] = useState(""); // State for selected size
//   const [selectedFlavour, setSelectedFlavour] = useState(""); // State for selected flavour
//   const [quantity, setQuantity] = useState(1); // State for quantity

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/products/${id}`
//         );

//         setProduct(response.data); // Store the fetched product data
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct(); // Call the fetch function
//   }, [id]); // Trigger the effect when the product ID changes

//   const handleAddToCart = async () => {
//     try {
//       // Prepare the payload
//       const payload = {
//         productId: id,
//         title: product.title,
//         photos: product.photos,
//         price: product.price,
//         quantity: quantity,
//         size: selectedSize,
//         flavour: selectedFlavour,
//       };

//       // Make a POST request to add the product to the cart on the server
//       const response = await axios.post(
//         "http://localhost:5000/api/cart/add",
//         payload
//       );

//       console.log("Product added to server cart:", response.data);
//     } catch (error) {
//       console.error("Error adding product to cart:", error);
//     }
//   };

//   if (!product) {
//     return <p>Loading product...</p>; // Show a loading state while fetching data
//   }

//   return (
//     <section className="py-16 px-8">
//       <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
//         <img
//           src={product.photos} // Use dynamic image URL
//           alt={product.title} // Use dynamic title for alt text
//           className="h-[36rem]"
//         />
//         <div>
//           <Typography className="mb-4 text-light-blue-500" variant="h3">
//             {product.title} {/* Use dynamic title */}
//           </Typography>
//           <Typography variant="h5" className="text-light-blue-500">
//             {/* Use dynamic price */}${product.price}
//           </Typography>
//           <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
//             {product.description} {/* Use dynamic description */}
//           </Typography>
//           <div className="my-8 flex items-center gap-2">
//             <Rating
//               value={product.rating || 5}
//               className="text-light-blue-600"
//               targetId={id}
//               type="product"
//             />
//             <Typography className="!text-sm font-bold !text-gray-700">
//               {product.rating}/5 ({product.reviewsCount} reviews){" "}
//               {/* Use dynamic rating and review count */}
//             </Typography>
//           </div>
//           <Typography color="blue-gray" variant="h6">
//             Color
//           </Typography>
//           <div className="my-8 mt-3 flex items-center gap-2">
//             <div className="flex w-72 flex-col gap-6">
//               {/* Map over available sizes */}
//               <Select
//                 size="xl"
//                 label="Size"
//                 color="blue"
//                 onChange={(e) => setSelectedSize(e)}
//               >
//                 {product.size && product.size.length > 0 ? (
//                   product.size.map((size, index) => (
//                     <Option key={index} value={size}>
//                       {size}
//                     </Option>
//                   ))
//                 ) : (
//                   <Option>No sizes available</Option>
//                 )}
//               </Select>

//               <Select
//                 size="xl"
//                 label="Flavours"
//                 color="blue"
//                 onChange={(e) => setSelectedFlavour(e)}
//               >
//                 {product.flavour && product.flavour.length > 0 ? (
//                   product.flavour.map((flavour, index) => (
//                     <Option key={index} value={flavour}>
//                       {flavour}
//                     </Option>
//                   ))
//                 ) : (
//                   <Option>No flavours available</Option>
//                 )}
//               </Select>
//             </div>
//           </div>
//           <div className="mb-4 flex w-full items-center gap-3 md:w-1/2">
//             <Button
//               color=""
//               className="w-52 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-2 hover:border-light-blue-500 transition-transform"
//               onClick={handleAddToCart} // Call the function when button is clicked
//             >
//               Add to Cart
//             </Button>
//             <IconButton color="blue" variant="text" className="shrink-0">
//               <Heart className="h-6 w-6" />{" "}
//               {/* Use Heart icon from lucide-react */}
//             </IconButton>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default ProductDetails;

// //
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Typography,
//   Button,
//   IconButton,
//   Select,
//   Option,
//   Alert,
//   AlertDescription,
//   AlertTitle,
// } from "@material-tailwind/react";
// import { Heart } from "lucide-react";
// // import Rating from "../components/RatingWithComments";

// function ProductDetails() {
//   const { id } = useParams(); // Get the product ID from the URL
//   const navigate = useNavigate();
//   const [product, setProduct] = useState({}); // State to hold the product data
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedFlavour, setSelectedFlavour] = useState("");
//   const [quantity, setQuantity] = useState(1);
//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:5000/api/products/${id}`
//         );
//         setProduct(response.data);
//       } catch (error) {
//         console.error("Error fetching product:", error);
//       }
//     };

//     fetchProduct(); // Call the fetch function
//   }, [id]);

//   const handleAddToCart = () => {
//     // Prepare the payload
//     const payload = {
//       productId: id,
//       title: product.title,
//       photos: product.photos,
//       price: product.price,
//       quantity: quantity,
//       size: selectedSize,
//       flavour: selectedFlavour,
//     };

//     // Retrieve existing cart from local storage or initialize an empty array
//     const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

//     // Add the new product to the cart
//     existingCart.push(payload);

//     // Save the updated cart back to local storage
//     localStorage.setItem("cart", JSON.stringify(existingCart));

//     console.log("Product added to local storage cart:", payload);
//     setShowAlert(true); // Show the success alert
//   };

//   const handleCloseAlert = () => {
//     setShowAlert(false);
//   };

//   const handleGoToCart = () => {
//     navigate("/cart");
//   };

//   if (!product) {
//     return <p>Loading product...</p>;
//   }

//   return (
//   <section className="py-16 px-8">
//     <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2">
//       <img src={product.photos} alt={product.title} className="h-[36rem]" />
//       <div>
//         <Typography className="mb-4 text-light-blue-500" variant="h3">
//           {product.title}
//         </Typography>
//         <Typography variant="h5" className="text-light-blue-500">
//           ${product.price}
//         </Typography>
//         <Typography className="!mt-4 text-base font-normal leading-[27px] !text-gray-500">
//           {product.description}
//         </Typography>
//         <div className="my-8 flex items-center gap-2">
//           <Typography className="!text-sm font-bold !text-gray-700">
//             {product.rating}/5 ({product.reviewsCount} reviews)
//           </Typography>
//         </div>
//         <Typography color="blue-gray" variant="h6">
//           Color
//         </Typography>
//         <div className="my-8 mt-3 flex items-center gap-2">
//           <div className="flex w-72 flex-col gap-6">
//             <Select
//               size="xl"
//               label="Size"
//               color="blue"
//               onChange={(e) => setSelectedSize(e)}
//             >
//               {product.size && product.size.length > 0 ? (
//                 product.size.map((size, index) => (
//                   <Option key={index} value={size}>
//                     {size}
//                   </Option>
//                 ))
//               ) : (
//                 <Option>No sizes available</Option>
//               )}
//             </Select>

//             <Select
//               size="xl"
//               label="Flavours"
//               color="blue"
//               onChange={(e) => setSelectedFlavour(e)}
//             >
//               {product.flavour && product.flavour.length > 0 ? (
//                 product.flavour.map((flavour, index) => (
//                   <Option key={index} value={flavour}>
//                     {flavour}
//                   </Option>
//                 ))
//               ) : (
//                 <Option>No flavours available</Option>
//               )}
//             </Select>
//           </div>
//         </div>
//         <div className="mb-4 flex w-full items-center gap-3 md:w-1/2">
//           <Button
//             color=""
//             className="w-52 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-2 hover:border-light-blue-500 transition-transform"
//             onClick={handleAddToCart}
//           >
//             Add to Cart
//           </Button>
//           <IconButton
//             color="blue"
//             variant="text"
//             className="shrink-0"
//           ></IconButton>
//         </div>
//       </div>
//     </div>

//     {/* Success alert */}
//     {showAlert && (
//       <Alert
//         color="green"
//         className="fixed bottom-4 left-4 z-50"
//         onClose={handleCloseAlert}
//       >
//         <AlertTitle>Product added to cart!</AlertTitle>
//         <AlertDescription>
//           <div className="flex justify-between items-center">
//             <span>View cart</span>
//             <Button color="green" variant="text" onClick={handleGoToCart}>
//               Go to Cart
//             </Button>
//           </div>
//         </AlertDescription>
//       </Alert>
//     )}
//   </section>
// );
// }

// export default ProductDetails;

//import React, { useEffect, useState } from "react";import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavour, setSelectedFlavour] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    // Get the current cart from localStorage (if it exists)
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Create a new product object with the necessary details
    const newProduct = {
      id: product._id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      flavour: selectedFlavour,
      quantity: 1, // Set the quantity to 1 by default or adjust as needed
      image: product.photos,
    };

    // Check if the product is already in the cart
    const productIndex = existingCart.findIndex(
      (item) => item.id === newProduct.id
    );

    if (productIndex >= 0) {
      // If the product is already in the cart, increase the quantity
      existingCart[productIndex].quantity += 1;
    } else {
      // Otherwise, add the new product to the cart
      existingCart.push(newProduct);
    }

    // Save the updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Show the alert that the product has been added to the cart
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleGoToCart = () => {
    // Navigation logic to cart page
    setShowAlert(false);
  };

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h6>Loading...</h6>
      </div>
    );
  }

  return (
    <section className="py-16 px-8">
      <div className="mx-auto container grid place-items-center grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={product.photos}
            alt={product.title}
            className="h-[36rem] w-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="w-full max-w-xl space-y-6">
          <h3 className="mb-4 text-light-blue-500">{product.title}</h3>

          <h5 className="text-light-blue-500">${product.price}</h5>

          <p className="text-base font-normal leading-[27px] text-gray-500">
            {product.description}
          </p>

          {product.rating && (
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-gray-700">
                {product.rating}/5 ({product.reviewsCount} reviews)
              </p>
            </div>
          )}

          <div className="space-y-4">
            <h6 className="text-blue-gray-500">Options</h6>

            <div className="flex flex-col gap-4">
              <div className="w-full">
                <label className="block text-sm font-semibold mb-2">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {product.size?.length > 0 ? (
                    product.size.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))
                  ) : (
                    <option>No sizes available</option>
                  )}
                </select>
              </div>

              <div className="w-full">
                <label className="block text-sm font-semibold mb-2">
                  Flavours
                </label>
                <select
                  value={selectedFlavour}
                  onChange={(e) => setSelectedFlavour(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {product.flavour?.length > 0 ? (
                    product.flavour.map((flavour, index) => (
                      <option key={index} value={flavour}>
                        {flavour}
                      </option>
                    ))
                  ) : (
                    <option>No flavours available</option>
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="w-52 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-2 hover:border-light-blue-500 transition-all duration-300 py-2 px-4 rounded-md"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {showAlert && (
        <div className="fixed bottom-4 left-4 z-50 max-w-md shadow-lg bg-green-500 text-white p-4 rounded-md">
          <h6>Product added to cart!</h6>
          <div className="flex justify-between items-center">
            <span>View cart</span>
            <button
              className="text-white font-semibold"
              onClick={handleGoToCart}
            >
              Go to Cart
            </button>
          </div>
          <button
            className="absolute top-2 right-2 text-white"
            onClick={handleCloseAlert}
          >
            &times;
          </button>
        </div>
      )}
    </section>
  );
}

export default ProductDetails;
