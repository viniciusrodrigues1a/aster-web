import { FiMenu, FiCreditCard, FiDollarSign, FiGrid } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

import { useSidebar } from "../contexts/SidebarContext";

/* eslint-disable react-hooks/rules-of-hooks */
export function WithSidebar(Component: () => React.ReactElement) {
  return () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isCollapsed, setIsCollapsed } = useSidebar();

    const getIconTextClasses = (): string => {
      const baseClasses =
        "text-neutral-50 text-sm tracking-tight mt-1 duration-100";
      if (isCollapsed) {
        return baseClasses + " -translate-x-20 ease-out";
      }

      return baseClasses + " translate-x-0 ease-in";
    };

    const getContainerClasses = (): string => {
      const baseClasses =
        "flex flex-col items-center min-h-screen h-full bg-blue-600 pt-6 transition-all";
      if (isCollapsed) {
        return baseClasses + " w-14 ease-out";
      }

      return baseClasses + " w-24 ease-in";
    };

    const getIconButtonClasses = (pathname: string): string => {
      const baseClasses = "flex flex-col justify-center items-center";
      if (location.pathname === pathname || isCollapsed) {
        return baseClasses;
      }

      return baseClasses + " opacity-50 hover:opacity-75";
    };

    const getIconClasses = (pathname: string): string => {
      const baseClasses = "bg-blue-600 p-2.5 rounded-full";
      if (location.pathname === pathname && isCollapsed) {
        return baseClasses + " bg-blue-800";
      }

      if (isCollapsed) {
        return baseClasses + " hover:bg-blue-700 opacity-50 hover:opacity-75";
      }

      return baseClasses;
    };

    return (
      <div
        style={{
          display: "grid",
          gridAutoColumns: "min-content 1fr",
          gridTemplateAreas: `"sidebar main"`,
          width: "100%",
        }}
      >
        <div
          className={getContainerClasses()}
          style={{ boxShadow: "2px 0px 4px rgba(0, 0, 0, 0.25)", zIndex: 1 }}
        >
          <button
            type="button"
            className="flex justify-center items-center w-full"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <FiMenu color="#fff" size={28} />
          </button>

          <button
            type="button"
            className={getIconButtonClasses("/dashboard") + " mt-20"}
            onClick={() => navigate("/dashboard")}
          >
            <div className={getIconClasses("/dashboard")}>
              <FiGrid color="#fff" size={24} />
            </div>
            <p className={getIconTextClasses()}>Dashboard</p>
          </button>

          <button
            type="button"
            className={getIconButtonClasses("/transactions") + " mt-6"}
            onClick={() => navigate("/transactions")}
          >
            <div className={getIconClasses("/transactions")}>
              <FiCreditCard color="#fff" size={24} />
            </div>
            <p className={getIconTextClasses()}>Transactions</p>
          </button>

          <button
            type="button"
            className={getIconButtonClasses("/expenses") + " mt-6"}
            onClick={() => navigate("/expenses")}
          >
            <div className={getIconClasses("/expenses")}>
              <FiDollarSign color="#fff" size={24} />
            </div>
            <p className={getIconTextClasses()}>Expenses</p>
          </button>
        </div>
        <Component />
      </div>
    );
  };
}
