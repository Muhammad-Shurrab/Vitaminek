import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import OrderCard from "./components/customcomponent/OrderCard"; // Assuming you have a custom OrderCard component
import Pagination from "./components/Pagination"; // Assuming you have a custom Pagination component

export default function OrdersSection() {
  const [activeTab, setActiveTab] = useState("pending");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6); // You can adjust this value to control the number of orders per page

  // Fetch orders based on the active tab (pending/completed)
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/dash/orders/${activeTab}` // Backend endpoint for pending/completed orders
      );
      setOrders(response.data);
    } catch (err) {
      setError("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  // Handle order status change (from Pending to Completed)
  const handleStatusChange = async (orderId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to mark this order as completed?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(241, 97, 38)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(`http://localhost:5000/api/dash/orders/${orderId}`); // PUT request to update the order status
        await fetchOrders(); // Re-fetch orders after status update
        Swal.fire(
          "Marked!",
          "The order has been marked as completed.",
          "success"
        );
      } catch (error) {
        Swal.fire("Error!", "Failed to update order status.", "error");
      }
    }
  };

  useEffect(() => {
    fetchOrders(); // Fetch orders whenever the active tab changes (pending/completed)
  }, [activeTab]);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="container mx-auto p-4">
      <h1
        className="my-4 text-center text-primary"
        style={{ color: "rgb(241, 97, 38)" }}
      >
        Order Management
      </h1>
      <div className="d-flex justify-center mb-4">
        <button
          className={`btn ${
            activeTab === "pending" ? "btn-primary" : "btn-outline-primary"
          } me-2`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Orders
        </button>
        <button
          className={`btn ${
            activeTab === "completed" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Orders
        </button>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div>
          {currentOrders.map((order) => (
            <OrderCard
              key={order._id}
              order={order}
              onStatusChange={handleStatusChange}
            />
          ))}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
        </div>
      )}
    </div>
  );
}
