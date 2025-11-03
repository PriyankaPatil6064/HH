import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png"; // ✅ your logo path

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            {/* <logo className="h-6 w-6 fill-primary text-primary" /> */}
             <img
            src={logo}
            alt="HerHealth AI Logo"
            className="w-14 h-14 object-contain"
          />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              HerHealth AI
            </span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              About
            </Link>
            <Link
              to="/faq"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/faq") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              FAQ
            </Link>
            <Button asChild size="sm" className="ml-2">
               <Link to="/chat">Take Test</Link>
            </Button>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
