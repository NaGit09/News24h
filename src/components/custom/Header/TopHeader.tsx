import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "../../ui/separator";
import DynamicIcon from "./DynamicIcon";
import { listDynamics } from "@/constant/link";
import { Link } from "react-router-dom";
import { UserIcon } from "@/components/ui/user";

export const TopHeader = () => {
  const maptoListDynamics = listDynamics.map((item) => (
    <DynamicIcon
      key={item.href}
      to={item.href}
      icon={item.icon}
      label={item.label}
    />
  ));

  return (
    <div className="flex justify-between gap-3 p-2">
      {/* Logo */}
      <div className="flex items-center justify-between gap-2">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block">
            News24h
          </span>
        </Link>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {maptoListDynamics}

        <Separator orientation="vertical" />

        {/* Search block */}
        <div
          className="relative hidden sm:block flex items-center justify-center
         gap-2 border-2 border-gray-200 rounded-lg"
        >
          <input
            type="text"
            placeholder="Search news..."
            className=" w-35 h-[36px] rounded-lg bg-transparent pl-2 text-sm 
            transition-colors focus-visible:outline-none"
          />
          <Button variant="ghost" size="icon">
            <Search className="h-2 w-2" />
          </Button>
        </div>

        <Separator orientation="vertical" />
        {/* Login block  */}
        <Button
          variant="ghost"
          className="hover:text-green-500 hover:bg-transparent"
        >
          <UserIcon />
          Đăng nhập
        </Button>
      </div>
    </div>
  );
};
