import { createContext, useState } from "react";

interface MyContextProviderProps {
  children: React.ReactNode;
}

interface GameContextType {
  openWindow: boolean;
  setOpenWindow: React.Dispatch<React.SetStateAction<boolean>>;
  categories: object;
  fetchAPI: (category: string) => void;
}

interface Categories {
  [key: string]: [];
}

const GameContext = createContext<GameContextType | null>(null);

const GameContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [openWindow, setOpenWindow] = useState<boolean>(true);
  const [categories, setCategories] = useState<Categories>({});
  // save the played questions, so that they cannot be played again
  const [playedQuestions, setPlayedQuestions] = useState<string[]>([]);

  // get list of the categories
  useState(async () => {
    const response = await fetch("https://the-trivia-api.com/api/categories");
    const data = await response.json();
    setCategories(data);
  });

  // Fetch puzzle in the Main component
  //TODO: figure out how to contain the played puzzles and check if the puzzle have been played yet
  const fetchAPI = async (category: string): Promise<void> => {
    const categoryQuery = categories[category];
    const response = await fetch(
      `https://the-trivia-api.com/api/questions?categories=${categoryQuery[0]}&type=`
    );
    const data = await response.json();

    let random = Math.floor(Math.random() * data.length);
    let puzzle = data[random];

    if (playedQuestions.includes(puzzle.id)) {
      random = Math.floor(Math.random() * data.length);
      puzzle = data[random];
    } else {
      setPlayedQuestions((playedQuestions) => [...playedQuestions, puzzle.id]);
    }

    console.log(puzzle);
  };

  const contextValue: GameContextType = {
    openWindow,
    setOpenWindow,
    categories,
    fetchAPI,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
