import React, { useState, useEffect } from "react";
import { useLocation, Link, Route, Routes } from "react-router-dom";
import {
  PieChart,
  Users,
  Package,
  ShoppingCart,
  Star,
  X,
  Menu,
} from "lucide-react";
import Overview from "./Overview";
import UsersPage from "./Users"; // Renamed to avoid conflict with Users icon
import Products from "./Products";
import Orders from "./Orders";
import Reviews from "./Reviews";

const sidebarItems = [
  { name: "Overview", icon: PieChart, path: "/admin" },
  { name: "Users", icon: Users, path: "/admin/users" },
  { name: "Products", icon: Package, path: "/admin/products" },
  { name: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { name: "Reviews", icon: Star, path: "/admin/reviews" },
];

const AdminDashboard = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-blue-600 text-white h-screen transition-all duration-300 fixed md:static`}
      >
        <button
          className={`absolute top-2 right-2 bg-blue-700 p-2 rounded-full md:hidden ${
            isOpen ? "block" : "translate-x-full"
          }`}
          onClick={toggleSidebar}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <h1
          className={`text-2xl font-bold p-4 text-center ${
            !isOpen ? "hidden" : ""
          }`}
        >
          Admin Dashboard
        </h1>

        <nav className="mt-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center p-4 hover:bg-blue-700 transition-colors ${
                  isActive ? "bg-blue-700" : ""
                }`}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <Icon size={20} className="mr-4" />
                <span className={`${!isOpen ? "hidden" : "block"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div
        className={`ml-0 md:ml-${
          isOpen ? "64" : "20"
        } transition-all flex-grow p-6`}
      >
        <Routes>
          <Route path="/admin" element={<Overview />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/products" element={<Products />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/reviews" element={<Reviews />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
