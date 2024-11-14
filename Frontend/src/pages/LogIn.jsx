// import {
//   Card,
//   Input,
//   Checkbox,
//   Button,
//   Typography,
// } from "@material-tailwind/react";
// import logo from "../images/Sign-up.svg";
// import { Link } from "react-router-dom";
// export default function LogInForm() {
//   return (
//     <div className="warpper gap-24 flex items-center justify-center p-24 bg-[url('../images/Gym.png')]">
//       <img
//         src={logo}
//         alt=""
//         className="rounded-lg bg-light-blue-900 w-[28rem] h-[30rem]"
//       />

//       <Card className=" " color="transparent" shadow={false}>
//         <Typography
//           className="text-light-blue-500"
//           variant="h4"
//           color="blue-gray"
//         >
//           Log-In
//         </Typography>
//         <Typography color="gray" className="mt-1 font-normal">
//           Nice to meet you! Enter your details to Log-in.
//         </Typography>
//         <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
//           <div className="mb-1 flex flex-col gap-6">
//             <Typography
//               variant="h6"
//               color="blue-gray"
//               className="-mb-3 text-light-blue-500"
//             >
//               Your Email
//             </Typography>
//             <Input
//               size="lg"
//               placeholder="name@mail.com"
//               className=" !border-t-blue-gray-200 transition-colors focus:!border-light-blue-500"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//             />
//             <Typography
//               variant="h6"
//               color="blue-gray"
//               className="-mb-3 text-light-blue-500"
//             >
//               Password
//             </Typography>
//             <Input
//               type="password"
//               size="lg"
//               placeholder="********"
//               className=" !border-t-blue-gray-200 transition-colors focus:!border-light-blue-500"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//             />
//           </div>

//           <Button
//             variant="outlined"
//             size="lg"
//             className="flex h-12 border-blue-gray-200 items-center justify-center gap-2 my-8"
//             fullWidth
//           >
//             <img
//               src={`https://www.material-tailwind.com/logos/logo-google.png`}
//               alt="google"
//               className="h-6 w-6"
//             />{" "}
//             Log-In with google
//           </Button>
//           <Button
//             className="mt-6 text-base  transition-colors hover:border-2 hover:scale-110 active:scale-100 focus:scale-105 border-light-blue-500 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-light-blue-500"
//             fullWidth
//           >
//             Log-In
//           </Button>
//           <Typography color="gray" className="mt-4 text-center font-normal">
//             Don't have an account?
//             <Link
//               to="/SignUpForm"
//               className="m-r-2 font-medium text-gray-900 transition-colors hover:text-light-blue-500"
//             >
//               Sign Up
//             </Link>
//           </Typography>
//         </form>
//       </Card>
//     </div>
//   );
// }
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import logo from "../images/Sign-up.svg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Features/Auth/authSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2"; // Import SweetAlert

export default function LogInForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form submission handler
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Form validation: make sure both fields are filled
  //   if (formData.email === "" || formData.password === "") {
  //     console.log("Error: Please fill in all fields");
  //     return;
  //   }

  //   // Dispatching login action (example: loginUser is the action)
  //   dispatch(loginUser(formData))
  //     .then((response) => {
  //       // Checking if login was successful
  //       if (response.payload.fulfilled) {
  //         console.log("Success: Logged in successfully!");

  //         // Navigate to another page after successful login
  //         navigate("/signup");
  //       } else {
  //         console.log(
  //           "Error: " + (response.payload.message || "Invalid credentials")
  //         );
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(
  //         "Login Failed: " + (error.message || "Something went wrong")
  //       );
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.email === "" || formData.password === "") {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    dispatch(loginUser(formData))
      .unwrap()
      .then(() => {
        Swal.fire("Success", "Logged in successfully!", "success");
        navigate("/"); // Adjust the route as needed
      })
      .catch((error) => {
        Swal.fire("Error", error.message || "Login failed", "error");
      });
  };

  return (
    <div className="wrapper gap-24 flex items-center justify-center p-24 bg-[url('../images/Gym.png')]">
      <motion.img
        src={logo}
        alt=""
        className="rounded-lg bg-light-blue-900 w-[28rem] h-[30rem]"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <Card className="" color="transparent" shadow={false}>
        <Typography
          className="text-light-blue-500"
          variant="h4"
          color="blue-gray"
        >
          Log-In
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to Log-in.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
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
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />
            Log-In with Google
          </Button>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              type="submit" // Added type submit for form handling
              className="mt-6 text-base transition-colors hover:border-2 border-light-blue-500 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500"
              fullWidth
            >
              Log-In
            </Button>
          </motion.div>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?
            <Link
              to="/SignUp"
              className="m-r-2 font-medium text-gray-900 transition-colors hover:text-light-blue-500"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
