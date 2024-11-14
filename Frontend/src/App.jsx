import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpForm from "./pages/SignUp";
import LogInForm from "./pages/LogIn";

import Home from "./pages/Home";

import Header from "./components/Header";
import AdminDashboard from "./pages/AdminDashboard";
import EcommerceProduct from "./components/Product";
import EcommerceCard from "./components/Card";
import Footer from "./components/Footer";
import Sponsors from "./components/Sponsers";
import Categories from "./pages/Categories";
import SearchBar from "./components/SearchBar";
import Details from "./components/Details";
import UserProfile from "./pages/Profile";
import ArticlesPage from "./pages/Articles";
import ArticlePage from "./pages/Article";
import ContactPage from "./pages/ContactUs";
import Cart from "./components/CartComponent";
import Checkout from "./pages/Payment";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<SignUpForm />} />
          <Route path="/Login" element={<LogInForm />} />
          <Route path="/Products" element={<Categories />} />
          <Route path="/Articles" element={<ArticlesPage />} />

          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/Products/:id" element={<EcommerceProduct />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/ContactPage" element={<ContactPage />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
        <Sponsors />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
