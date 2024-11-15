import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-${color}-500 text-white p-6 rounded-lg shadow-lg mb-6`}>
    <div className="flex justify-between items-center">
      <h5 className="text-xl font-bold">{title}</h5>
      <i className={`bi bi-${icon} text-3xl`} />
    </div>
    <h2 className="text-3xl mt-4">{value}</h2>
  </div>
);

const Dashboard = () => {
  const [data, setData] = useState({ users: 0, orders: 0, products: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, ordersRes, productsRes] = await Promise.all([
        axios.get("http://localhost:5000/api/dash/"),
        axios.get("http://localhost:5000/api/dash/orders/completed"),
        axios.get("http://localhost:5000/api/products/"),
      ]);

      setData({
        users: usersRes.data.length,
        orders: ordersRes.data.length,
        products: productsRes.data.length,
      });
      setError(null);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const chartData = [
    { name: "Users", value: data.users },
    { name: "Orders", value: data.orders },
    { name: "Products", value: data.products },
  ];

  const filteredChartData =
    activeTab === "all"
      ? chartData
      : chartData.filter((item) => item.name.toLowerCase() === activeTab);

  return (
    <div className="container mx-auto mt-12 px-6">
      {error && (
        <div className="alert bg-red-500 text-white p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        <div>
          <StatCard
            title="Total Users"
            value={data.users}
            icon="people"
            color="green"
          />
        </div>
        <div>
          <StatCard
            title="Total Orders"
            value={data.orders}
            icon="cart"
            color="blue"
          />
        </div>
        <div>
          <StatCard
            title="Total Products"
            value={data.products}
            icon="box"
            color="yellow"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-12">
        <div className="flex justify-between items-center mb-4">
          <h5 className="text-xl font-semibold">Overview Statistics</h5>
          <div className="space-x-4">
            {["all", "users", "orders", "products"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={filteredChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="text-right">
        <button
          onClick={fetchData}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <div
                className="spinner-border spinner-border-sm mr-2"
                role="status"
              />
              Refreshing...
            </div>
          ) : (
            "Refresh Data"
          )}
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
