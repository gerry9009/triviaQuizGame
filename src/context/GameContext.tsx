import { createContext, useEffect, useState } from "react";

interface MyContextProviderProps {
  children: React.ReactNode;
}

interface GameContextType {
  openWindow: boolean;
  setOpenWindow: React.Dispatch<React.SetStateAction<boolean>>;
  categories: object;
  playingQuestion: string;
  playingAnswers: string[];
  gameStart: (value: string) => void;
  setSettledCategory: React.Dispatch<React.SetStateAction<string>>;
  gamePlay: () => void;
}

interface Categories {
  [key: string]: [];
}

interface FetchedData {
  question: string;
  correctAnswer: string;
  incorrectAnswers: [string];
  id: string;
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
  const [settledCategory, setSettledCategory] = useState<string>("");
  const [playingQuestion, setPlayingQuestion] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [playingAnswers, setPlayingAnswers] = useState<string[]>([]);
  const [chosedAnswer, setChosedAnswer] = useState<string>("");

  // Fetch API to get the list of the categories
  useEffect(() => {
    (async () => {
      const response = await fetch("https://the-trivia-api.com/api/categories");
      const data = await response.json();
      setCategories(data);
    })();
  }, []);

  // Fetch API to get a puzzle
  const fetchAPI = async (category: string): Promise<FetchedData> => {
    const categoryQuery: string[] = categories[category];

    const response = await fetch(
      `https://the-trivia-api.com/api/questions?categories=${categoryQuery}&limit=1`
    );
    const data = await response.json();

    const puzzle = data[0];

    puzzle.incorrectAnswers.length = 3;

    return puzzle;
  };

  // Start a new game in the main menu
  const gameStart = async (value: string) => {
    // clear the list of the played id
    setListOfPlayedPuzzles([]);

    // settled the playing category
    setSettledCategory(value);

    // fetch Data => get Question, Correct Answer, 3 Incorrect Answer
    const data: FetchedData = await fetchAPI(value);

    settingData(
      data.id,
      data.question,
      data.correctAnswer,
      data.incorrectAnswers
    );
    console.log(data.correctAnswer);
  };

  const gamePlay = async () => {
    // check the user answer

    const data: FetchedData = await fetchAPI(settledCategory);
    settingData(
      data.id,
      data.question,
      data.correctAnswer,
      data.incorrectAnswers
    );
    console.log(data.correctAnswer);
    //TODO: check the puzzle was used
  };

  // utility functions
  const reorderArray = (arr: string[]): string[] => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const settingData = (
    id: string,
    question: string,
    correctAnswer: string,
    incorrectAnswers: string[]
  ): void => {
    setListOfPlayedPuzzles((played) => [...played, id]);
    setPlayingQuestion(question);
    setCorrectAnswer(correctAnswer);
    const answers = reorderArray([correctAnswer, ...incorrectAnswers]);
    setPlayingAnswers(answers);
  };

  // Export variable
  const contextValue: GameContextType = {
    openWindow,
    setOpenWindow,
    categories,
    playingQuestion,
    playingAnswers,
    gameStart,
    setSettledCategory,
    gamePlay,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
