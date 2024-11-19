import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewComments from "./Review";
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
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const newProduct = {
      id: product._id,
      title: product.title,
      price: product.price,
      size: selectedSize,
      flavour: selectedFlavour,
      quantity: 1,
      image: product.photos,
    };

    const productIndex = existingCart.findIndex(
      (item) => item.id === newProduct.id
    );

    if (productIndex >= 0) {
      existingCart[productIndex].quantity += 1;
    } else {
      existingCart.push(newProduct);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    setShowAlert(true);
  };

  const handleCloseAlert = () => setShowAlert(false);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h6>Loading...</h6>
      </div>
    );
  }

  return (
    <section className="py-8 px-4 md:py-16 md:px-8">
      <div className="container mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="w-full flex items-center justify-center">
          <img
            src={product.photos}
            alt={product.title}
            className="h-80 md:h-[36rem] w-full object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="w-full max-w-2xl space-y-6">
          <h3 className="text-xl md:text-3xl font-semibold text-light-blue-500">
            {product.title}
          </h3>

          <h5 className="text-lg md:text-2xl font-medium text-light-blue-500">
            ${product.price}
          </h5>

          <p className="text-sm md:text-base text-gray-500">
            {product.description}
          </p>

          {product.rating && (
            <div className="flex items-center gap-2">
              <p className="text-sm md:text-base font-semibold text-gray-700">
                {product.rating}/5 ({product.reviewsCount} reviews)
              </p>
            </div>
          )}

          <div className="space-y-4">
            <h6 className="text-sm md:text-base font-medium text-blue-gray-500">
              Options
            </h6>

            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm md:text-base"
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

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Flavours
                </label>
                <select
                  value={selectedFlavour}
                  onChange={(e) => setSelectedFlavour(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm md:text-base"
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

          <button
            className="w-full md:w-52 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-2 hover:border-light-blue-500 transition-all duration-300 py-2 px-4 rounded-md"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {showAlert && (
        <div className="fixed bottom-4 left-4 z-50 w-11/12 max-w-md shadow-lg bg-green-500 text-white p-4 rounded-md">
          <h6 className="text-sm md:text-base">Product added to cart!</h6>
          <button
            className="absolute top-2 right-2 text-white"
            onClick={handleCloseAlert}
          >
            &times;
          </button>
        </div>
      )}

      <ReviewComments productId={id} />
    </section>
  );
}

export default ProductDetails;
