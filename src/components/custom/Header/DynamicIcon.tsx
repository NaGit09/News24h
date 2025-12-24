import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ActivityIconHandle } from "@/components/ui/activity";
import type { DynamicIconProps } from "@/types/icon.type";

const DynamicIcon = ({
  to,
  icon: Icon,
  label,
  className,
}: DynamicIconProps) => {
  const iconRef = useRef<ActivityIconHandle>(null);

  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn("hover:text-green-500 hover:bg-transparent", className)}
        onMouseEnter={() => iconRef.current?.startAnimation()}
        onMouseLeave={() => iconRef.current?.stopAnimation()}
      >
        <Icon ref={iconRef} />
        {label}
      </Button>
    </Link>
  );
};

export default DynamicIcon;
