import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-tailwind/react";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white px-8 pt-12 pb-6 mt-10 border-t">
      <div className="container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <Typography variant="h5" className="text-light-blue-500 mb-2">
              About Us
            </Typography>
            <Typography className="text-gray-600">
              We are committed to providing the best products and services to
              our customers. Your satisfaction is our top priority.
            </Typography>
            <div className="flex gap-4">
              <Link to="#" className="text-gray-600 hover:text-light-blue-500">
                <Facebook size={20} />
              </Link>
              <Link to="#" className="text-gray-600 hover:text-light-blue-500">
                <Twitter size={20} />
              </Link>
              <Link to="#" className="text-gray-600 hover:text-light-blue-500">
                <Instagram size={20} />
              </Link>
              <Link to="#" className="text-gray-600 hover:text-light-blue-500">
                <Youtube size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <Typography variant="h5" className="text-light-blue-500 mb-2">
              Quick Links
            </Typography>
            <Link
              to="/products"
              className="text-gray-600 hover:text-light-blue-500"
            >
              Products
            </Link>
            <Link
              to="/articles"
              className="text-gray-600 hover:text-light-blue-500"
            >
              Articles
            </Link>
            <Link
              to="/contactpage"
              className="text-gray-600 hover:text-light-blue-500"
            >
              Contact Us
            </Link>
            <Link
              to="/privacy-policy"
              className="text-gray-600 hover:text-light-blue-500"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-600 hover:text-light-blue-500"
            >
              Terms & Conditions
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-2">
            <Typography variant="h5" className="text-light-blue-500 mb-2">
              Contact Info
            </Typography>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={18} />
              <Typography>123 Business Street, Suite 100</Typography>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={18} />
              <Typography>+1 (555) 123-4567</Typography>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={18} />
              <Typography>support@company.com</Typography>
            </div>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <Typography variant="h5" className="text-light-blue-500 mb-2">
              Newsletter
            </Typography>
            <Typography className="text-gray-600">
              Subscribe to our newsletter for updates and exclusive offers.
            </Typography>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-light-blue-500"
              />
              <button className="px-4 py-2 bg-light-blue-500 text-white rounded-lg hover:bg-light-blue-600 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Typography className="text-center text-gray-600">
            © {currentYear} Vitaminek. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
