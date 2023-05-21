import { useContext } from "react";
import Welcome from "./components/Welcome";
import Main from "./components/Main";
import DarkModeToggle from "./components/DarkModeToggle";
import Footer from "./components/Footer";

import { DarkModeContextProvider } from "./context/DarkModeContext.tsx";
import { GameContext } from "./context/GameContext.tsx";

function App() {
  // initialize open window
  const { openWindow } = useContext(GameContext) || {};

  return (
    <DarkModeContextProvider>
      <div className="h-screen bg-gray-100 text-slate-950 dark:bg-slate-950 dark:text-gray-100 flex flex-col justify-center items-center">
        <DarkModeToggle />
        {openWindow ? <Welcome /> : <Main />}
        <div className=" absolute left-0 right-0 bottom-0">
          <Footer />
        </div>
      </div>
    </DarkModeContextProvider>
  );
}

export default App;
