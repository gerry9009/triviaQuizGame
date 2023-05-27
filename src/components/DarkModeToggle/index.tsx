import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";

const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useContext(DarkModeContext) || {};

  const handleDarkMode = () => {
    if (setDarkMode) {
      setDarkMode((darkMode: boolean) => !darkMode);
    }
  };

  return (
    <div className="w-10 h-6 absolute top-2 left-3">
      <input
        type="checkbox"
        id="toggle"
        checked={darkMode}
        onChange={handleDarkMode}
        className="absolute w-0 h-0 opacity-0"
      />
      <label
        htmlFor="toggle"
        className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
      ></label>
      <span
        className={
          "block absolute top-0 w-6 h-6 dark:translate-x-4 transform transition-transform duration-300 ease-in-out bg-slate-700 dark:bg-white rounded-full"
        }
      ></span>
    </div>
  );
};

export default DarkModeToggle;
