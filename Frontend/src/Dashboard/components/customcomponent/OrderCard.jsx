import React from "react";
import { Check, Clock } from "lucide-react";

const OrderCard = ({ order, onStatusChange }) => {
  const isPending = order.paymentStatus === "Pending";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            Order #{order._id.slice(-6)}
          </h3>
          <div
            className={`
            px-3 py-1 rounded-full flex items-center gap-2
            ${
              isPending
                ? "bg-amber-100 text-amber-700"
                : "bg-green-100 text-green-700"
            }
          `}
          >
            {isPending ? (
              <Clock className="w-4 h-4" />
            ) : (
              <Check className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{order.paymentStatus}</span>
          </div>
        </div>
        <p className="text-2xl font-bold text-blue-600">
          ${order.totalAmount.toFixed(2)}
        </p>
      </div>

      {/* Products List */}
      <div className="p-6">
        <h4 className="text-sm font-semibold text-gray-600 mb-3">Products</h4>
        <ul className="space-y-3">
          {order.products.map((productDetail) => (
            <li
              key={productDetail.product._id}
              className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span className="text-gray-800">
                  {productDetail.title}
                  {console.log("Whey", productDetail.title)}
                </span>
                <span className="text-sm text-gray-500">
                  x{productDetail.quantity}
                </span>
              </div>
              <span className="font-medium text-blue-600">
                ${productDetail.product.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6">
        {isPending && (
          <button
            onClick={() => onStatusChange(order._id)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg
              transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm
              hover:shadow-md active:transform active:scale-[0.98]"
          >
            <Check className="w-4 h-4" />
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderCard;
