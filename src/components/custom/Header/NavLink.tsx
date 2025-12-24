import { navItems } from "@/constant/nav";
import { Link } from "react-router-dom";
import { hoverColorClass } from "@/constant/text";

const NavLink = () => {
  return (
    <nav className="flex items-center gap-4 text-sm font-medium 
    justify-center overflow-x-auto no-scrollbar md:gap-6 w-full
    md:w-auto pb-1 md:pb-0 sm:flex-wrap">
      {navItems.map((item) => {
        return (
          <Link
            key={item.href}
            to={item.href}
            className={`text-black transition-colors ${
              hoverColorClass[item.color || 'default']
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavLink;
