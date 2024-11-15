import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing Pages and Components
import Home from "./pages/Home";
import SignUpForm from "./pages/SignUp";
import LogInForm from "./pages/LogIn";
import Categories from "./pages/Categories";
import UserProfile from "./pages/Profile";
import ArticlesPage from "./pages/Articles";
import ArticlePage from "./pages/Article";
import ContactPage from "./pages/ContactUs";
import Cart from "./components/CartComponent";
import Checkout from "./pages/Checkout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sponsors from "./components/Sponsers";
import Product from "./components/Product";

// Admin Dashboard Pages
import AdminDashboard from "./Dashboard/AdminDashboard";
import Overview from "./Dashboard/Overview";
import Users from "./Dashboard/Users";
import Products from "./Dashboard/Products";
import Orders from "./Dashboard/Orders";

// Layout Component for Admin Dashboard
function DashboardLayout({ children }) {
  return (
    <div>
      <AdminDashboard />
      {children}
    </div>
  );
}

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LogInForm />} />
          <Route path="/products" element={<Categories />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/contactpage" element={<ContactPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Admin Dashboard Routes */}
          <Route path="/admin/*" element={<DashboardLayout />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
            <Route path="orders" element={<Orders />} />

            {/* 404 Catch-All for Admin */}
            <Route path="*" element={<div>404: Page Not Found</div>} />
          </Route>
        </Routes>
        <Sponsors />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
