import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GameContextProvider } from "./context/GameContext.tsx";
import { HashRouter } from "react-router-dom";
import { DarkModeContextProvider } from "./context/DarkModeContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameContextProvider>
      <DarkModeContextProvider>
        <HashRouter>
          <App />
        </HashRouter>
      </DarkModeContextProvider>
    </GameContextProvider>
  </React.StrictMode>
);
