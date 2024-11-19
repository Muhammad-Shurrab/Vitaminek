import React, { useState, useEffect } from "react";
import axios from "axios";
import OrderCard from "./components/customcomponent/OrderCard";
import { Loader2 } from "lucide-react";

const OrdersSection = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/dash/orders/${activeTab}`
      );
      setOrders(response.data);
      console.log("Orders", orders);
    } catch (err) {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/dash/orders/${orderId}`);
      await fetchOrders();
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeTab]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
          Order Management
        </h1>

        {/* Tab Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "pending"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
            }`}
          >
            Pending Orders
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
              activeTab === "completed"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
            }`}
          >
            Completed Orders
          </button>
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
              {error}
            </div>
          ) : (
            <div className="space-y-4">
              {currentOrders.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No {activeTab} orders found
                </div>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {currentOrders.map((order) => (
                      <div
                        key={order._id}
                        className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <OrderCard
                          order={order}
                          onStatusChange={handleStatusChange}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                      {[...Array(totalPages)].map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPage(index + 1)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            currentPage === index + 1
                              ? "bg-blue-600 text-white"
                              : "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersSection;
