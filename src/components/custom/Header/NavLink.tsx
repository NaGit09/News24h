import { navItems } from "@/constant/nav";
import DynamicIcon from "./DynamicIcon";
import { hoverColorClass } from "@/constant/text";

const NavLink = () => {
  return (
    <nav
      className="flex items-center gap-4 text-sm font-medium 
    justify-center overflow-x-auto no-scrollbar md:gap-6 w-full
    md:w-auto pb-1 md:pb-0 sm:flex-wrap"
    >
      {navItems.map((item) => {
        return (
          <DynamicIcon
            key={item.href}
            to={item.href}
            icon={item.icon}
            label={item.label}
            className={hoverColorClass[item.color || "default"]}
          />
        );
      })}
    </nav>
  );
};

export default NavLink;
