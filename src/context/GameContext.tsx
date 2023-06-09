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
  correctAnswer: string;
  gameStart: (value: string) => void;
  gamePlay: (value: string) => void;
  responseUser: boolean;
  clickedIndex: number | null;
  setClickedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  disabledBtns: boolean;
  setDisabledBtns: React.Dispatch<React.SetStateAction<boolean>>;
  userPoints: number;
  userPlayedGame: number;
  userCorrectAnswer: number;
  settingData: (
    id: string,
    question: string,
    correctAnswer: string,
    incorrectAnswers: string[]
  ) => void;
  settledCategory: string;
  setLocalStorageData: () => void;
  clearLocalStorageData: () => void;
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

  // save the played questions, so that they cannot be played again
  const [listOfPlayedPuzzles, setListOfPlayedPuzzles] = useState<string[]>([]);

  // current question
  const [settledCategory, setSettledCategory] = useState<string>("");
  const [playingQuestion, setPlayingQuestion] = useState<string>("");
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  const [playingAnswers, setPlayingAnswers] = useState<string[]>([]);

  // user data
  const [responseUser, setResponseUser] = useState<boolean>(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [disabledBtns, setDisabledBtns] = useState<boolean>(false);

  // user points
  const [userPoints, setUserPoints] = useState<number>(0);
  const [userCorrectAnswer, setUserCorrectAnswer] = useState<number>(0);
  const [userPlayedGame, setUserPlayedGame] = useState<number>(0);

  // localstorage data
  const [userData, setUserData] = useState<object | null>(null);

  const getLocalStorageData = () => {
    const data = localStorage.getItem("triviaData");

    if (data) {
      setUserData(JSON.parse(data));
    } else {
      const objectStructure = {
        gameStats: {
          allPlayedGame: 0,
          allCorrectAnswer: 0,
          accuracy: 0,
        },
        recordStats: {
          maxEarnPoints: 0,
          bestAccuracy: 0,
          longestGame: 0,
          shortestGame: 0,
        },
        allGameStats: {},
      };
      const myNewData: { [key: string]: object } = {};

      for (const category in categories) {
        myNewData[category] = objectStructure;
      }
      setUserData(myNewData);
    }
  };

  const setLocalStorageData = () => {
    //TODO: create data object

    //TODO: create date
    const date = new Date().toJSON().slice(0, 19).replace("T", "_");
    const percent = Math.round((userCorrectAnswer / userPlayedGame) * 100);

    const playedGame: { [key: string]: object } = {};

    playedGame[date] = {
      playedGame: userPlayedGame,
      correctAnswer: userCorrectAnswer,
      accuracy: percent,
      earnPoints: userPoints,
    };

    const myData: { [key: string]: any } = { ...userData };
    const { gameStats, recordStats, allGameStats } = myData[settledCategory];

    gameStats.allPlayedGame += userPlayedGame;
    gameStats.allCorrectAnswer += userCorrectAnswer;
    gameStats.accuracy = Math.round(
      (gameStats.allCorrectAnswer / gameStats.allPlayedGame) * 100
    );

    recordStats.longestGame =
      recordStats.longestGame > userPlayedGame
        ? recordStats.longestGame
        : userPlayedGame;
    recordStats.shortestGame =
      recordStats.shortestGame < userPlayedGame
        ? recordStats.shortestGame
        : userPlayedGame;

    recordStats.maxEarnPoints =
      recordStats.maxEarnPoints > userPoints
        ? recordStats.maxEarnPoints
        : userPoints;
    recordStats.bestAccuracy =
      recordStats.bestAccuracy > percent ? recordStats.bestAccuracy : percent;

    allGameStats[date] = {
      playedGame: userPlayedGame,
      correctAnswer: userCorrectAnswer,
      accuracy: percent,
      earnPoints: userPoints,
    };

    console.log(gameStats, recordStats, allGameStats);
    console.log(myData);
    setUserData(myData);
    localStorage.setItem("triviaData", JSON.stringify(myData));
  };

  const clearLocalStorageData = () => {
    localStorage.removeItem("triviaData");
  };

  useEffect(() => {
    getLocalStorageData();
  }, [categories]);

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
    setUserPoints(0);
    setUserCorrectAnswer(0);
    setUserPlayedGame(0);

    // settled the playing category
    setSettledCategory(value);

    // fetch Data => get Question, Correct Answer, 3 Incorrect Answer
    const data: FetchedData = await fetchAPI(value);

    // set to default user state
    settingData(
      data.id,
      data.question,
      data.correctAnswer,
      data.incorrectAnswers
    );
  };

  const gamePlay = (value: string) => {
    // send response to the user
    setTimeout(() => {
      // send response to the user
      setResponseUser(true);

      setUserPlayedGame((current) => current + 1);
      if (value === correctAnswer) {
        setUserPoints((current) => current + 10);
        setUserCorrectAnswer((current) => current + 1);
      } else if (value !== correctAnswer && userPoints > 0) {
        setUserPoints((current) => current - 10);
      }
    }, 1000);

    // get new puzzle
    setTimeout(async () => {
      let data: FetchedData = await fetchAPI(settledCategory);

      // check if the puzzle was in the game
      while (listOfPlayedPuzzles.includes(data.id)) {
        data = await fetchAPI(settledCategory);
      }

      settingData(
        data.id,
        data.question,
        data.correctAnswer,
        data.incorrectAnswers
      );

      // set to default the user state
      setResponseUser(false);
      setClickedIndex(null);
      setDisabledBtns(false);
    }, 2500);
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
    correctAnswer,
    gameStart,
    gamePlay,
    responseUser,
    clickedIndex,
    setClickedIndex,
    disabledBtns,
    setDisabledBtns,
    //TODO: this should be send to the EndGame page
    userPoints,
    userPlayedGame,
    userCorrectAnswer,
    settingData,
    settledCategory,
    setLocalStorageData,
    clearLocalStorageData,
  };

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
