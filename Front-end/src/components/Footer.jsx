import { Typography } from "@material-tailwind/react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-white p-5  border-t-2 border-light-blue-500">
      <div className="flex  flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-white text-center md:justify-between">
        <img src={logo} alt="logo-ct" className="w-40" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Link to="/Categories">
              <Typography
                as="a"
                href="#"
                color="blue-gray"
                className="font-normal transition-colors hover:text-white hover:bg-light-blue-400 p-1 rounded"
              >
                Categories
              </Typography>
            </Link>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-white hover:bg-light-blue-400 p-1 rounded"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-white hover:bg-light-blue-400 p-1 rounded"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-white hover:bg-light-blue-400 p-1 rounded"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-light-blue-200 " />
      <Typography color="light-blue" className="text-center font-normal">
        &copy; 2024 Vitaminek
      </Typography>
    </footer>
  );
}
