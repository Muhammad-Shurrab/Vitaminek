import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUpForm from "./pages/SignUp";
import LogInForm from "./pages/LogIn";

import Home from "./pages/Home";
import "./App.css";
import Header from "./components/Header";
import EcommerceCard from "./components/Card";
import Footer from "./components/Footer";

import Categories from "./pages/Categories";
import SearchBar from "./components/SearchBar";
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
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
