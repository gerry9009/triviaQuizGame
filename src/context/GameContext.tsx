import { createContext, useState } from "react";

interface MyContextProviderProps {
  children: React.ReactNode;
}

interface GameContextType {
  openWindow: boolean;
  setOpenWindow: React.Dispatch<React.SetStateAction<boolean>>;
  categories: object;
  fetchAPI: (category: string) => void;
  playingQuestion: string;
  playingAnswers: string[];
}

interface Categories {
  [key: string]: [];
}

const GameContext = createContext<GameContextType | null>(null);

const GameContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [openWindow, setOpenWindow] = useState<boolean>(true);
  // get the list of the categories
  const [categories, setCategories] = useState<Categories>({});
  // TODO: save the played questions, so that they cannot be played again
  const [listOfPlayedPuzzles, setListOfPlayedPuzzles] = useState<string[]>([]);
  // TODO: current question
  const [playingQuestion, setPlayingQuestion] = useState<string>("");
  const [playingAnswers, setPlayingAnswers] = useState<string[]>([]);

  // Fetch API to get the list of the categories
  useState(async () => {
    const response = await fetch("https://the-trivia-api.com/api/categories");
    const data = await response.json();
    setCategories(data);
  });

  // Fetch API to get a puzzle
  //TODO: figure out how to contain the played puzzles and check if the puzzle have been played yet
  const fetchAPI = async (category: string): Promise<void> => {
    const categoryQuery: string[] = categories[category];
    console.log(categoryQuery);
    const response = await fetch(
      `https://the-trivia-api.com/api/questions?categories=${categoryQuery[0]}`
    );
    const data = await response.json();

    //TODO: create a function which check the selected element id
    const random = Math.floor(Math.random() * data.length);
    const puzzle = data[random];

    //TODO: create a random order function
    const correctAnswer = puzzle.correctAnswer;
    const incorrectAnswers = puzzle.incorrectAnswers;
    console.log(incorrectAnswers);
    console.log(puzzle.incorrectAnswers);
    setPlayingAnswers([correctAnswer, ...incorrectAnswers]);
    setPlayingQuestion(puzzle.question);
  };

  // Export variable
  const contextValue: GameContextType = {
    openWindow,
    setOpenWindow,
    categories,
    fetchAPI,
    //TODO: export game question and answers and correct answer
    playingQuestion,
    playingAnswers,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
