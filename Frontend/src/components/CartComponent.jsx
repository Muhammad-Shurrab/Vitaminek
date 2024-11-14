import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash } from "lucide-react"; // Import Lucide's Trash icon

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Load cart items from localStorage on component mount
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

  const addToCart = (item) => {
    // Check if the item is already in the cart
    const existingItem = cartItems.find((i) => i.id === item.id);
    if (existingItem) {
      // If the item is already in the cart, update the quantity
      const updatedCartItems = cartItems.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      setCartItems(updatedCartItems);
      localStorage.setItem("cart", JSON.stringify(updatedCartItems));
      calculateTotalPrice(updatedCartItems);
    } else {
      // If the item is not in the cart, add it
      const newCartItems = [...cartItems, { ...item, quantity: 1 }];
      setCartItems(newCartItems);
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      calculateTotalPrice(newCartItems);
    }
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
    // Remove the item from the cart
    const updatedCartItems = cartItems.filter((i) => i.id !== item.id);
    setCartItems(updatedCartItems);
    localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    calculateTotalPrice(updatedCartItems);
  };

  const clearCart = () => {
    // Clear the entire cart
    setCartItems([]);
    localStorage.removeItem("cart");
    setTotalPrice(0);
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log("Checkout clicked");
  };

  const handleContinueShopping = () => {
    // Navigate to the product list or home page
    navigate("/products");
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
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default ShoppingCart;
