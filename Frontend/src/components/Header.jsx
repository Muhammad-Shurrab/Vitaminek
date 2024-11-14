// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../images/logo.png";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../Features/Auth/authSlice";
// import {
//   Navbar,
//   MobileNav,
//   Typography,
//   Button,
//   IconButton,
// } from "@material-tailwind/react";
// import { ShoppingCart } from "lucide-react";

// export default function Header() {
//   const [openNav, setOpenNav] = React.useState(false);
//   const user = useSelector((state) => state.auth.user);
//   const isLoggedIn = !!user;
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     window.addEventListener(
//       "resize",
//       () => window.innerWidth >= 960 && setOpenNav(false)
//     );
//   }, []);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/");
//   };

//   const navList = (
//     <ul className="mt-8 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
//       <Typography as="li" variant="large" color="" className="p-1 font-normal">
//         <Link
//           to="/Products"
//           className="flex items-center transition-colors hover:text-light-blue-500"
//         >
//           Products
//         </Link>
//       </Typography>
//       <Typography as="li" variant="large" color="" className="p-1 font-normal">
//         <Link
//           to="UserProfile"
//           className="flex items-center transition-colors hover:text-light-blue-500"
//         >
//           Profile
//         </Link>
//       </Typography>
//       <Typography as="li" variant="large" color="" className="p-1 font-normal">
//         <Link
//           href="#"
//           className="flex items-center transition-colors hover:text-light-blue-500"
//         >
//           AboutUS
//         </Link>
//       </Typography>
//       <Typography as="li" variant="large" color="" className="p-1 font-normal">
//         <Link
//           to="/ContactPage"
//           className="flex items-center transition-colors hover:text-light-blue-500"
//         >
//           ContactUs
//         </Link>
//       </Typography>
//     </ul>
//   );

//   return (
//     <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-hidden">
//       <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 mt-8">
//         <div className="flex items-center justify-around text-blue-gray-900">
//           <Link to="/">
//             <img
//               src={logo}
//               className="mr-4 cursor-pointer py-1.5 w-40 "
//               alt="Logo"
//             />
//           </Link>

//           <div className="flex justify-around items-center gap-4">
//             <div className="mr-4 hidden lg:block justify-self-start">
//               {navList}
//             </div>
//             <div className="flex items-center gap-x-1">
//               {isLoggedIn ? (
//                 <>
//                   <Link to="/cart">
//                     <IconButton variant="text" className="text-light-blue-500">
//                       <ShoppingCart size={24} />
//                     </IconButton>
//                   </Link>
//                   <Button
//                     color="red"
//                     size="lg"
//                     onClick={handleLogout}
//                     className="hidden lg:inline-block ml-4"
//                   >
//                     Log Out
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <Link to="/Login">
//                     <Button
//                       variant="text"
//                       size="sm"
//                       className="hidden lg:inline-block"
//                     >
//                       Log In
//                     </Button>
//                   </Link>
//                   <Link to="SignUp">
//                     <Button
//                       variant=""
//                       size="m"
//                       className="hidden lg:inline-block bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-2 hover:border-light-blue-500 transition-transform"
//                     >
//                       Sign Up
//                     </Button>
//                   </Link>
//                 </>
//               )}
//             </div>
//             <IconButton
//               variant="text"
//               className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
//               ripple={false}
//               onClick={() => setOpenNav(!openNav)}
//             >
//               {openNav ? (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   className="h-6 w-6"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth={2}
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               )}
//             </IconButton>
//           </div>
//         </div>
//         <MobileNav open={openNav}>
//           {navList}
//           <div className="flex items-center gap-x-1">
//             {isLoggedIn ? (
//               <>
//                 <Link to="/cart">
//                   <IconButton variant="text" className="text-light-blue-500">
//                     <ShoppingCart size={24} />
//                   </IconButton>
//                 </Link>
//                 <Button
//                   color="red"
//                   fullWidth
//                   variant="outlined"
//                   size="sm"
//                   onClick={handleLogout}
//                 >
//                   Log Out
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button fullWidth variant="gradient" size="sm">
//                   <Link to="/Login">Log In</Link>
//                 </Button>
//                 <Button fullWidth variant="gradient" size="sm">
//                   <Link to="/SignUp">Sign Up</Link>
//                 </Button>
//               </>
//             )}
//           </div>
//         </MobileNav>
//       </Navbar>
//     </div>
//   );
// }

//
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import Cookies from "js-cookie"; // Import the js-cookie library
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ShoppingCart, CircleUser } from "lucide-react";

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [cartCount, setCartCount] = React.useState(0);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = Cookies.get("token");

    setIsLoggedIn(!!token);
    console.log("Eren", token);
    // Retrieve cart items from local storage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(cartItemCount);

    // Re-check login status whenever cookies are updated
    window.addEventListener("storage", () => {
      const token = Cookies.get("token");
      setIsLoggedIn(!!token);
    });

    return () => {
      window.removeEventListener("storage", () => {});
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("token"); // Remove token on logout
    setIsLoggedIn(false); // Update login status
    navigate("/"); // Redirect to the homepage
    // Trigger a custom event to force a re-check of login status
    window.dispatchEvent(new Event("storage"));
  };

  const navList = (
    <ul className="mt-8 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography as="li" variant="large" color="" className="p-1 font-normal">
        <Link
          to="/Products"
          className="flex items-center transition-colors hover:text-light-blue-500"
        >
          Products
        </Link>
      </Typography>
      <Typography as="li" variant="large" color="" className="p-1 font-normal">
        <Link
          href="#"
          className="flex items-center transition-colors hover:text-light-blue-500"
        >
          AboutUS
        </Link>
      </Typography>
      <Typography as="li" variant="large" color="" className="p-1 font-normal">
        <Link
          to="/articles"
          className="flex items-center transition-colors hover:text-light-blue-500"
        >
          Articles
        </Link>
      </Typography>
      <Typography as="li" variant="large" color="" className="p-1 font-normal">
        <Link
          to="/ContactPage"
          className="flex items-center transition-colors hover:text-light-blue-500"
        >
          ContactUs
        </Link>
      </Typography>
    </ul>
  );

  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-hidden">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 mt-8">
        <div className="flex items-center justify-around text-blue-gray-900">
          <Link to="/">
            <img
              src={logo}
              className="mr-4 cursor-pointer py-1.5 w-40 "
              alt="Logo"
            />
          </Link>

          <div className="flex justify-around items-center gap-4">
            <div className="mr-4 hidden lg:block justify-self-start">
              {navList}
            </div>
            <div className="flex items-center gap-x-1">
              {isLoggedIn ? (
                <>
                  <Link to="/userprofile">
                    <IconButton variant="text" className="text-light-blue-500">
                      <CircleUser />
                    </IconButton>
                  </Link>
                  <Link to="/cart">
                    <IconButton variant="text" className="text-light-blue-500">
                      <ShoppingCart size={24} />
                      {cartCount > 0 && (
                        <span className="absolute text-red-500">
                          {cartCount}
                        </span>
                      )}
                    </IconButton>
                  </Link>
                  <Button
                    color="red"
                    size="lg"
                    onClick={handleLogout}
                    className="hidden lg:inline-block ml-4"
                  >
                    Log Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/Login">
                    <Button
                      variant="text"
                      size="sm"
                      className="hidden lg:inline-block"
                    >
                      Log In
                    </Button>
                  </Link>
                  <Link to="SignUp">
                    <Button
                      variant=""
                      size="m"
                      className="hidden lg:inline-block bg-light-blue-500 text-white hover:bg-white hover:text-light-blue-500 hover:border-2 hover:border-light-blue-500 transition-transform"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            {isLoggedIn ? (
              <>
                <Link to="/cart">
                  <IconButton variant="text" className="text-light-blue-500">
                    <ShoppingCart size={24} />
                    {cartCount > 0 && (
                      <span className="absolute text-red-500">{cartCount}</span>
                    )}
                  </IconButton>
                </Link>
                <Button
                  color="red"
                  fullWidth
                  variant="outlined"
                  size="sm"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Button fullWidth variant="gradient" size="sm">
                  <Link to="/Login">Log In</Link>
                </Button>
                <Button fullWidth variant="gradient" size="sm">
                  <Link to="/SignUp">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
