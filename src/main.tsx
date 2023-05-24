import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GameContextProvider } from "./context/GameContext.tsx";
import { BrowserRouter } from "react-router-dom";
import { DarkModeContextProvider } from "./context/DarkModeContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GameContextProvider>
      <DarkModeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DarkModeContextProvider>
    </GameContextProvider>
  </React.StrictMode>
);
