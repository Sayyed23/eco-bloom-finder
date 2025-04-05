
import { Link } from "react-router-dom";
import { Leaf, ListFilter, MapPin, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocation } from "react-router-dom";

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Find Your Tree", icon: MapPin, path: "/find" },
    { name: "Tree Profiles", icon: ListFilter, path: "/tree-profiles" },
    { name: "My Trees", icon: Leaf, path: "/my-trees" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 border-t bg-background">
      <nav className="container flex items-center justify-between py-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={cn(
              "flex flex-1 flex-col items-center justify-center px-2 py-2 text-xs font-medium",
              location.pathname === item.path
                ? "text-eco-green"
                : "text-gray-500 hover:text-eco-green"
            )}
          >
            <item.icon className="mb-1 h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
