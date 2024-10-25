// import {
//   Card,
//   Input,
//   Checkbox,
//   Button,
//   Typography,
//   Select,
//   Option,
// } from "@material-tailwind/react";
// import logo from "../images/Log-in.svg";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { registerUser } from "../Features/Auth/authSlice";
// export default function SignUpForm() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     nam: "",
//     email: "",
//     password: "",
//     role: "user",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUser);
//   };

//   return (
//     <div className="warpper gap-24 flex items-center justify-center p-24 bg-[url('../images/Gym.png')]">
//       <Card className=" " color="transparent" shadow={false}>
//         <Typography
//           className="text-light-blue-500"
//           variant="h4"
//           color="blue-gray"
//         >
//           Sign Up
//         </Typography>
//         <Typography color="gray" className="mt-1 font-normal">
//           Nice to meet you! Enter your details to register.
//         </Typography>
//         <form
//           onSubmit={handleSubmit}
//           className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
//         >
//           <div className="mb-1 flex flex-col gap-6">
//             <Typography
//               variant="h6"
//               color="blue-gray"
//               className="-mb-3 text-light-blue-500"
//             >
//               Your Name
//             </Typography>
//             <Input
//               onChange={handleChange}
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
//               Your Email
//             </Typography>
//             <Input
//               onChange={handleChange}
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
//               onChange={handleChange}
//               size="lg"
//               placeholder="********"
//               className=" !border-t-blue-gray-200 transition-colors focus:!border-light-blue-500"
//               labelProps={{
//                 className: "before:content-none after:content-none",
//               }}
//             />

//             <Select
//               onChange={handleChange}
//               color="blue"
//               variant="outlined"
//               label="Sign-Up as:"
//             >
//               <Option value="user">Regular User</Option>
//               <Option value="trader">Trader</Option>
//             </Select>
//           </div>
//           <Checkbox
//             className="checked:bg-light-blue-500 checked:border-light-blue-500"
//             label={
//               <Typography
//                 variant="small"
//                 color="grey"
//                 className="flex items-center font-normal"
//               >
//                 I agree the
//                 <Link
//                   href="#"
//                   className="font-medium transition-colors hover:text-light-blue-500"
//                 >
//                   &nbsp;Terms and Conditions
//                 </Link>
//               </Typography>
//             }
//             containerProps={{ className: "-ml-2.5" }}
//           />

//           {/* <Button
//             variant="outlined"
//             size="lg"
//             className="flex h-12 border-blue-gray-200 items-center justify-center gap-2"
//             fullWidth
//           >
//             <img
//               src={`https://www.material-tailwind.com/logos/logo-google.png`}
//               alt="google"
//               className="h-6 w-6"
//             />{" "}
//             sign up with google
//           </Button> */}
//           <Button
//             className="mt-6  text-base  transition-colors hover:border-2 hover:scale-110 active:scale-100 focus:scale-105 border-light-blue-500 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-light-blue-500"
//             fullWidth
//           >
//             sign up
//           </Button>
//           <Typography color="gray" className="mt-4 text-center font-normal">
//             Already have an account?{" "}
//             <Link
//               to="/LogInForm"
//               className="font-medium text-gray-900 transition-colors border-light-blue-500 hover:text-light-blue-500"
//             >
//               Sign In
//             </Link>
//           </Typography>
//         </form>
//       </Card>

//       <img
//         src={logo}
//         className="rounded-lg bg-light-blue-900 w-[28rem] h-[32rem]"
//         alt=""
//       />
//     </div>
//   );
// }

//
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import logo from "../images/Log-in.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../Features/Auth/authSlice";
import { motion } from "framer-motion";
import Swal from "sweetalert2"; // SweetAlert library

export default function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Inside Handle");
    dispatch(registerUser(formData)); // Pass form data to the action
    console.log(formData);
    console.log("1");
    // SweetAlert notification
    Swal.fire({
      title: "Registered Successfully!",
      text: "You can now log in with your credentials.",
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      navigate("/Login"); // Redirect after alert
    });
  };

  return (
    <motion.div
      className="warpper gap-24 flex items-center justify-center p-24 bg-[url('../images/Gym.png')]"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className=" " color="transparent" shadow={false}>
        <Typography
          className="text-light-blue-500"
          variant="h4"
          color="blue-gray"
        >
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <motion.div
            className="mb-1 flex flex-col gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Typography
              variant="h6"
              color="blue-gray"
              className="-mb-3 text-light-blue-500"
            >
              Your Name
            </Typography>
            <Input
              name="name" // Added name attribute
              value={formData.name} // Bind to formData
              onChange={handleChange}
              size="lg"
              placeholder="John Doe"
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
              Your Email
            </Typography>
            <Input
              name="email" // Added name attribute
              value={formData.email} // Bind to formData
              onChange={handleChange}
              size="lg"
              placeholder="name@mail.com"
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
              name="password" // Added name attribute
              value={formData.password} // Bind to formData
              type="password"
              onChange={handleChange}
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 transition-colors focus:!border-light-blue-500"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />

            <Select
              name="role" // Added name attribute
              value={formData.role} // Bind to formData
              onChange={(e) => setFormData({ ...formData, role: e })}
              color="blue"
              variant="outlined"
              label="Sign-Up as:"
            >
              <Option value="user">Regular User</Option>
              <Option value="trader">Trader</Option>
            </Select>
          </motion.div>
          <Checkbox
            className="checked:bg-light-blue-500 checked:border-light-blue-500"
            label={
              <Typography
                variant="small"
                color="grey"
                className="flex items-center font-normal"
              >
                I agree to the
                <Link
                  href="#"
                  className="font-medium transition-colors hover:text-light-blue-500"
                >
                  &nbsp;Terms and Conditions
                </Link>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              type="submit" // Added type submit for form handling
              className="mt-6 text-base transition-colors hover:border-2 border-light-blue-500 bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500"
              fullWidth
            >
              Sign up
            </Button>
          </motion.div>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to="/LogIn"
              className="font-medium text-gray-900 transition-colors border-light-blue-500 hover:text-light-blue-500"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>

      <motion.img
        src={logo}
        className="rounded-lg bg-light-blue-900 w-[28rem] h-[32rem]"
        alt=""
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
}
