import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./pages/SignUp";
import LogInForm from "./pages/LogIn";

import Home from "./pages/Home";
import "./App.css";
import Header from "./components/Header";
import EcommerceProduct from "./components/Product";
import EcommerceCard from "./components/Card";
import Footer from "./components/Footer";
import Sponsors from "./components/Sponsers";
import Categories from "./pages/Categories";
import SearchBar from "./components/SearchBar";
import Details from "./components/Details";
import UserProfile from "./pages/Profile";
import ContactPage from "./pages/ContactUs";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/SignUpForm" element={<SignUpForm />} />
          <Route path="/LogInForm" element={<LogInForm />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/ContactPage" element={<ContactPage />} />
        </Routes>
        <Sponsors />
        <EcommerceProduct />
        <Details />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
