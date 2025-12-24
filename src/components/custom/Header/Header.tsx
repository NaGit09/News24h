import NavLink from "./NavLink";
import { TopHeader } from "./TopHeader";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

const Header = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;

          if (y < 20) {
            setIsCollapsed(false);
          } else if (y > lastScrollY.current + 15) {
            setIsCollapsed(true);
          } else if (y < lastScrollY.current - 15) {
            setIsCollapsed(false);
          }

          lastScrollY.current = y;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 
    border-b border-border/40 transition-all">
      <div className=" md:w-container  flex flex-col">
        <motion.div
          initial="expanded"
          animate={isCollapsed ? "collapsed" : "expanded"}
          variants={{
            expanded: { height: "auto", opacity: 1, marginBottom: "0.5rem" },
            collapsed: { height: 0, opacity: 0, marginBottom: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <TopHeader />
        </motion.div>

        {/* Nav luôn hiển thị */}
        <div className="p-2">
          <NavLink />
        </div>
      </div>
    </header>
  );
};
export default Header;
