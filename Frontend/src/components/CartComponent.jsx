import React, { useState, useEffect } from "react";
import { Trash } from "lucide-react";
import CheckoutModal from "../pages/Checkout";
import { motion } from "framer-motion"; // Framer Motion for animations
import Swal from "sweetalert2"; // SweetAlert2 for user-friendly alerts
import "sweetalert2/dist/sweetalert2.min.css";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cart");
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      setCartItems(parsedCartItems);
      calculateTotalPrice(parsedCartItems);
    }
  }, []);

  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const updateQuantity = (item, action) => {
    const updatedCartItems = cartItems.map((i) =>
      i.id === item.id
        ? {
            ...i,
            quantity:
              action === "increase"
                ? i.quantity + 1
                : Math.max(i.quantity - 1, 1),
          }
        : i
    );
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
  };

  const removeFromCart = (item) => {
    const updatedCartItems = cartItems.filter((i) => i.id !== item.id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    setTotalPrice(0);
  };

  const handleCheckoutClick = () => {
    Swal.fire({
      title: "Proceed to Checkout?",
      text: "You will be redirected to the checkout process.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed",
    }).then((result) => {
      if (result.isConfirmed) {
        setShowCheckout(true);
      }
    });
  };

  return (
    <div className="p-8">
      <h4 className="text-3xl font-semibold mb-8">Shopping Cart</h4>
      {cartItems.length > 0 ? (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.image[0]}
                    alt={item.title}
                    className="w-16 h-16 object-cover mr-4"
                  />
                  <div>
                    <h6 className="font-medium">{item.title}</h6>
                    <p className="text-sm text-gray-500">
                      Quantity:
                      <button
                        onClick={() => updateQuantity(item, "decrease")}
                        className="ml-2 text-gray-600 hover:text-gray-800"
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => updateQuantity(item, "increase")}
                        className="ml-2 text-gray-600 hover:text-gray-800"
                      >
                        +
                      </button>
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">${item.price}</p>
                  <button
                    className="ml-4 text-red-600 hover:text-red-800"
                    onClick={() => removeFromCart(item)}
                  >
                    <Trash className="w-6 h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-100 flex justify-between items-center">
            <h6 className="text-lg font-semibold">
              Total: ${totalPrice.toFixed(2)}
            </h6>
            <div className="flex gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={clearCart}
              >
                Clear Cart
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
      {showCheckout && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50"
        >
          <CheckoutModal
            cartItems={cartItems}
            totalPrice={totalPrice}
            onClose={() => setShowCheckout(false)}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ShoppingCart;
