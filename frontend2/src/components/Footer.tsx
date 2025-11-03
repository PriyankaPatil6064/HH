import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-8 mt-16">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="HerHealth Logo" className="h-8 w-auto" />
          <span className="font-semibold text-gray-700">HerHealth AI</span>
        </div>

        <div className="flex space-x-4 text-sm text-gray-600">
          <Link to="/faq" className="hover:text-primary">FAQ</Link>
          <Link to="/chat" className="hover:text-primary">Take Assessment</Link>
          <Link to="/about" className="hover:text-primary">About</Link>
        </div>

        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} HerHealth AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
