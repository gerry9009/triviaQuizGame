import { createContext, useState } from "react";

interface MyContextProviderProps {
  children: React.ReactNode;
}

interface GameContextType {
  openWindow: boolean;
  setOpenWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameContext = createContext<GameContextType | null>(null);

const GameContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [openWindow, setOpenWindow] = useState<boolean>(true);

  const contextValue: GameContextType = {
    openWindow,
    setOpenWindow,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
