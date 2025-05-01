import React, { useContext } from "react";
import { FaSun, FaMoon, FaTasks } from "react-icons/fa";
import { Switch } from "@mui/material";
import { UserContext } from "../context/userContext";

const Navbar = ({ title, showLogo = true }) => {
  const { Theme, setTheme } = useContext(UserContext);

  const toggleTheme = () => {
    setTheme(!Theme);
  };

  return (
    <nav className={`w-full p-4 shadow-md bg-gray-800`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className={`flex items-center gap-4 text-2xl font-semibold text-white`}>
          {showLogo && <FaTasks />}
          {title}
        </div>

        <div className="flex items-center gap-2">
          {Theme ? (
            <FaMoon className="text-gray-300" />
            ) : (
            <FaSun className="text-yellow-500" />
          )}
          <Switch checked={Theme} onChange={toggleTheme} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
