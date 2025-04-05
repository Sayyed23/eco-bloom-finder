
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-eco-green" />
          <span className="text-xl font-bold text-eco-green">eco-bloom-finder</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
