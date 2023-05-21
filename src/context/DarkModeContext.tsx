import { createContext, useState, useEffect } from "react";

interface MyContextProviderProps {
  children: React.ReactNode;
}

interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const DarkModeContext = createContext<DarkModeContextType | null>(null);

const DarkModeContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
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

  const contextValue: DarkModeContextType = {
    darkMode,
    setDarkMode,
  };

  return (
    <DarkModeContext.Provider value={contextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContextProvider, DarkModeContext };
