import { useState, useEffect } from "react";
import Welcome from "./components/Welcome";
import Main from "./components/Main";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  // initialize open window
  const [openWindow, setOpenWindow] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // initialize the dark mode depend on the browser theme
  useEffect(() => {
    if (window.matchMedia("(prefer-color-scheme: dark)").matches) {
      setDarkMode(true);
    }
  }, []);

  // Handle dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="h-screen bg-gray-100 text-slate-950 dark:bg-slate-950 dark:text-gray-100 flex flex-col justify-center items-center">
      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
      {openWindow ? <Welcome setOpenWindow={setOpenWindow} /> : <Main />}
    </div>
  );
}

export default App;
