import React, { useState } from "react";
import axios from "axios";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { X } from "lucide-react";

const Checkout = ({ cartItems, totalPrice, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePaymentSuccess = async (details) => {
    setLoading(true);
    try {
      const orderData = {
        products: cartItems.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: totalPrice.toFixed(2),
        paymentStatus: "Pending",
        paypalPaymentId: details.id,
        paypalOrderId: details.purchase_units[0].payments.captures[0].id, // Ensure this matches your PayPal API response structure
      };
      console.log("Order Data:", orderData);
      await axios.post(
        "http://localhost:5000/api/orders/create",
        orderData,
        {},
        { withCredentials: true }
      );
      setPaymentSuccess(true);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Payment error:", error); // Log for debugging
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative">
      {/* Close button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        onClick={onClose}
      >
        <X className="w-5 h-5" />
      </button>

      <h2 className="text-lg font-bold mb-4 text-center">Checkout</h2>

      {paymentSuccess ? (
        <p className="text-green-500 text-center mt-4">
          Payment Successful! Thank you for your order.
        </p>
      ) : (
        <>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <h3 className="text-gray-700 font-medium mb-2">Order Summary</h3>
            <ul className="space-y-2">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center text-gray-600"
                >
                  <span>{item.title}</span>
                  <span>x{item.quantity}</span>
                </li>
              ))}
            </ul>
            <div className="text-gray-800 font-medium mt-2">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </div>

          <PayPalScriptProvider
            options={{
              "client-id":
                "AXSHzO_ufOdxM-ouhu0UJ_8xAsr5RnrYC09jLAs5YTnLe97HTxEWyy7jXJ-Qm5Qh-Yid6GNCWX9DX807",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalPrice.toFixed(2),
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                console.log("PayPal Details:", details); // Log the details object
                handlePaymentSuccess(details);
              }}
            />
          </PayPalScriptProvider>
        </>
      )}

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {loading && (
        <p className="text-blue-500 mt-4 text-center">Processing Payment...</p>
      )}
    </div>
  );
};

export default Checkout;
