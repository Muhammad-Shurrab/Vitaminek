// import React from "react";
// import {
//   Button,
//   Input,
//   Typography,
//   Card,
//   CardBody,
// } from "@material-tailwind/react";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import axios from "axios";

// export default function Checkout() {
//   const cartItems = useSelector((state) => state.cart.items);
//   const userId = useSelector((state) => state.userid); // Assuming user ID is stored in Redux

//   // Calculate the total price
//   const totalPrice = cartItems?.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const handlePayment = async () => {
//     if (cartItems && cartItems.length > 0) {
//       const payload = {
//         userId: userId,
//         items: cartItems.map((item) => ({
//           productId: item.productId,
//           name: item.title,
//           quantity: item.quantity,
//           price: item.price,
//         })),
//         bill: totalPrice,
//       };

//       try {
//         // Send POST request to backend
//         const response = await axios.post(
//           "http://localhost:5000/api/orders/",
//           payload,
//           { withCredentials: true },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );

//         Swal.fire(
//           "Payment Successful!",
//           "Your order has been placed.",
//           "success"
//         );
//       } catch (error) {
//         console.error("Error processing payment:", error);
//         Swal.fire(
//           "Payment Failed",
//           "There was an error processing your payment.",
//           "error"
//         );
//       }
//     } else {
//       Swal.fire("Error", "Your cart is empty!", "error");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <Card className="w-full max-w-md">
//         <CardBody>
//           <Typography
//             variant="h4"
//             color="blue-gray"
//             className="mb-4 text-center"
//           >
//             Checkout
//           </Typography>

//           <form className="space-y-4">
//             <Input label="Name" size="lg" required />
//             <Input label="Email" type="email" size="lg" required />
//             <Input label="Shipping Address" size="lg" required />
//             <Input label="Credit Card Number" type="text" size="lg" required />
//             <Input
//               label="Expiration Date"
//               type="text"
//               size="lg"
//               placeholder="MM/YY"
//               required
//             />
//             <Input label="CVV" type="text" size="lg" required />
//           </form>

//           <Typography
//             variant="h5"
//             color="blue-gray"
//             className="mt-6 text-center"
//           >
//             Total Price: ${totalPrice ? totalPrice.toFixed(2) : "0.00"}
//           </Typography>

//           <Button
//             color="lightBlue"
//             className="mt-4 w-full"
//             size="lg"
//             onClick={handlePayment}
//           >
//             Pay
//           </Button>
//         </CardBody>
//       </Card>
//     </div>
//   );
// }

//

// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import axios from "axios";

// export default function Checkout() {
//   const [dropdown1, setDropdown1] = useState(false);
//   const [changeText1, setChangeText1] = useState("City");

//   const cartItems = useSelector((state) => state.cart.items);
//   const userId = useSelector((state) => state.userid);

//   const totalPrice = cartItems?.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

//   const handlePayment = async () => {
//     if (cartItems && cartItems.length > 0) {
//       const payload = {
//         userId,
//         items: cartItems.map((item) => ({
//           productId: item.productId,
//           name: item.title,
//           quantity: item.quantity,
//           price: item.price,
//         })),
//         bill: totalPrice,
//       };

//       try {
//         await axios.post("http://localhost:5000/api/orders/", payload, {
//           withCredentials: true,
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         });
//         Swal.fire(
//           "Payment Successful!",
//           "Your order has been placed.",
//           "success"
//         );
//       } catch (error) {
//         Swal.fire(
//           "Payment Failed",
//           "There was an error processing your payment.",
//           "error"
//         );
//       }
//     } else {
//       Swal.fire("Error", "Your cart is empty!", "error");
//     }
//   };

//   return (
//     <div className="overflow-y-hidden">
//       <div className="flex justify-center items-center 2xl:container lg:py-16 py-9 px-4 md:px-6 lg:px-20 xl:px-44">
//         <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 space-y-12 lg:space-y-0">
//           <div className="flex w-full flex-col justify-start items-start">
//             <p className="text-3xl lg:text-4xl font-semibold text-blue-400">
//               Checkout
//             </p>
//             <div className="mt-8">
//               <p className="text-xl font-semibold text-blue-400">
//                 Shipping Details
//               </p>
//               <input
//                 className="border-b border-gray-300 focus:border-blue-400 placeholder-blue-600 py-4 w-full outline-none"
//                 type="text"
//                 placeholder="First Name"
//               />
//               <input
//                 className="border-b border-gray-300 focus:border-blue-400 placeholder-blue-600 py-4 w-full outline-none"
//                 type="text"
//                 placeholder="Last Name"
//               />
//               <input
//                 className="border-b border-gray-300 focus:border-blue-400 placeholder-blue-600 py-4 w-full outline-none"
//                 type="text"
//                 placeholder="Address"
//               />
//               {/* Dropdown for City Selection */}
//             </div>
//             <button
//               onClick={handlePayment}
//               className="mt-8 bg-blue-600 text-white w-full py-4"
//             >
//               Proceed to Payment
//             </button>
//           </div>
//           <div className="bg-gray-50 p-6 border-blue-400 border-4 rounded wi">
//             <h1 className="text-2xl font-semibold text-blue-400">
//               Order Summary
//             </h1>
//             <p className="font-bold text-xl">
//               Total Price: ${totalPrice?.toFixed(2)}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

//
import React, { useState } from "react";
import {
  Button,
  Input,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

export default function Checkout() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const userId = useSelector((state) => state.userid);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    address: "",
    creditCard: "",
    expiration: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.creditCard || !/^\d{16}$/.test(formData.creditCard))
      newErrors.creditCard = "Valid 16-digit credit card number is required";
    if (!formData.expiration || !/^\d{2}\/\d{2}$/.test(formData.expiration))
      newErrors.expiration = "Expiration date in MM/YY format is required";
    if (!formData.cvv || !/^\d{3,4}$/.test(formData.cvv))
      newErrors.cvv = "CVV is required (3 or 4 digits)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    const payload = {
      userId,
      items: cartItems.map((item) => ({
        productId: item.productId,
        name: item.title,
        quantity: item.quantity,
        price: item.price,
      })),
      bill: totalPrice,
    };

    try {
      await axios.post(
        "http://localhost:5000/api/orders/",
        payload,
        { withCredentials: true },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      Swal.fire(
        "Payment Successful!",
        "Your order has been placed.",
        "success"
      );
      navigate("/");
    } catch (error) {
      Swal.fire("Payment Failed", "Error processing your payment.", "error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardBody>
          <Typography
            variant="h4"
            color="blue-gray"
            className="mb-4 text-center text-blue-400"
          >
            Checkout
          </Typography>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <Input
              label="Username"
              size="lg"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <Input
              label="Email"
              type="email"
              size="lg"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <Input
              label="Shipping Address"
              size="lg"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              error={!!errors.address}
              helperText={errors.address}
            />
            <Input
              label="Credit Card Number"
              size="lg"
              name="creditCard"
              value={formData.creditCard}
              onChange={handleInputChange}
              error={!!errors.creditCard}
              helperText={errors.creditCard}
              placeholder="1234 5678 9123 4567"
            />
            <Input
              label="Expiration Date"
              size="lg"
              name="expiration"
              value={formData.expiration}
              onChange={handleInputChange}
              error={!!errors.expiration}
              helperText={errors.expiration}
              placeholder="MM/YY"
            />
            <Input
              label="CVV"
              size="lg"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              error={!!errors.cvv}
              helperText={errors.cvv}
              placeholder="123"
            />
          </form>

          <Typography
            variant="h5"
            color="blue-gray"
            className="mt-6 text-center text-blue-400"
          >
            Total Price: ${totalPrice ? totalPrice.toFixed(2) : "0.00"}
          </Typography>

          <Button
            color="lightBlue"
            className="mt-4 w-full bg-blue-400"
            size="lg"
            onClick={handlePayment}
          >
            Pay
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
