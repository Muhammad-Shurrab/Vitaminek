import { Card, Input, Button, Typography } from "@material-tailwind/react";
import logo from "../images/Sign-up.svg";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

// Configure axios defaults
axios.defaults.withCredentials = true;

export default function LogInForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const loginUser = async (userData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      userData,
      { withCredentials: true }
    );
    return response.data;
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Send Google user data to your backend
      const response = await axios.post(
        "http://localhost:5000/api/auth/google-login",
        {
          email: result.user.email,
          name: result.user.displayName,
          googleId: result.user.uid,
          photo: result.user.photoURL,
        }
      );

      const userData = response.data;
      localStorage.setItem("user", JSON.stringify(userData));

      // Navigate based on role
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      Swal.fire("Success", "Logged in successfully with Google!", "success");
    } catch (error) {
      console.error("Google login error:", error);
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: "Unable to login with Google. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    try {
      setIsLoading(true);
      const userData = await loginUser(formData);

      // Store the user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Navigate based on role
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      Swal.fire("Success", "Logged in successfully!", "success");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";

      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-24 p-6 sm:p-12 bg-[url('../images/Gym.png')] bg-cover bg-center min-h-screen">
      <motion.img
        src={logo}
        alt="Sign Up Illustration"
        className="rounded-lg bg-light-blue-900 w-full max-w-sm sm:max-w-md lg:max-w-[28rem] h-auto lg:h-[30rem]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <Card
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
        color="transparent"
        shadow={false}
      >
        <Typography
          className="text-light-blue-500 text-center"
          variant="h4"
          color="blue-gray"
        >
          Log-In
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal text-center text-sm sm:text-base"
        >
          Nice to meet you! Enter your details to Log-in.
        </Typography>
        <form
          className="mt-8 mb-2 w-full max-w-xs sm:max-w-sm md:max-w-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 text-light-blue-500"
            >
              Your Email
            </Typography>
            <Input
              name="email"
              size="lg"
              placeholder="name@mail.com"
              value={formData.email}
              onChange={handleInputChange}
              className="!border-t-blue-gray-200 transition-colors focus:!border-light-blue-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 text-light-blue-500"
            >
              Password
            </Typography>
            <Input
              name="password"
              type="password"
              size="lg"
              placeholder="********"
              value={formData.password}
              onChange={handleInputChange}
              className="!border-t-blue-gray-200 transition-colors focus:!border-light-blue-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>

          <Button
            variant="outlined"
            size="lg"
            className="flex h-12 border-blue-gray-200 items-center justify-center gap-2 my-8"
            fullWidth
            onClick={handleGoogleLogin}
            type="button"
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="Google Logo"
              className="h-6 w-6"
            />
            Log-In with Google
          </Button>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              type="submit"
              className="mt-6 text-base transition-colors hover:border-2 border-light-blue-500 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log-In"}
            </Button>
          </motion.div>
          <Typography
            color="gray"
            className="mt-4 text-center text-sm sm:text-base font-normal"
          >
            Don't have an account?{" "}
            <Link
              to="/SignUp"
              className="font-medium text-gray-900 transition-colors hover:text-light-blue-500"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
