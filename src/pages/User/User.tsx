import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../../context/GameContext";
import Layout from "../../components/Layout";
import { v4 as uuidv4 } from "uuid";
import { BiHomeAlt2 } from "react-icons/bi";
import { BsFillCalendarDateFill } from "react-icons/bs";
import {
  AiFillFire,
  AiOutlineCheck,
  AiOutlinePercentage,
  AiFillStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";

interface GameStats {
  allPlayedGame: number;
  allCorrectAnswer: number;
  accuracy: number;
}

interface RecordStats {
  maxEarnPoints: number;
  bestAccuracy: number;
  longestGame: number;
  shortestGame: number;
}

interface GameResult {
  playedGame: number;
  correctAnswer: number;
  accuracy: number;
  earnPoints: number;
  date: string;
}

interface UserData {
  [key: string]: {
    gameStats?: GameStats;
    recordStats?: RecordStats;
    allGameStats?: GameResult[];
  };
}

const User = () => {
  const { categories, userData, clearLocalStorageData } =
    useContext(GameContext) || {};

  const [selectedCategory, setSelectedCategory] = useState<keyof UserData>();
  const [allGame, setAllGame] = useState<GameStats | undefined>(undefined);
  const [myRecords, setMyRecords] = useState<RecordStats | undefined>(
    undefined
  );
  const [allPlayedGameStats, setAllPlayedGameStats] = useState<
    GameResult[] | undefined
  >([]);

  const listOfCategories: string[] = categories ? Object.keys(categories) : [];
  const userDataTyped = userData as UserData;

  useEffect(() => {
    if (userDataTyped && selectedCategory) {
      const results = userDataTyped[selectedCategory];

      if (results) {
        const { gameStats, recordStats, allGameStats } = results;

        setAllGame(gameStats);
        setMyRecords(recordStats);
        setAllPlayedGameStats(allGameStats);
      }
    }
  }, [selectedCategory, userDataTyped]);

  const Option = ({ category }: { category: string }): JSX.Element => {
    return <option value={category}>{category}</option>;
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value as keyof UserData;
    setSelectedCategory(target);
  };

  const SelectList = (): JSX.Element => {
    return (
      <>
        <label htmlFor="categories" className="block mb-2 font-medium text-2xl">
          Select a Category
        </label>
        <select
          id="categories"
          className="w-11/12 m-auto border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleOnChange}
          value={selectedCategory}
        >
          {selectedCategory === undefined && <option>Choose a category</option>}
          {listOfCategories.map((category) => {
            return <Option category={category} key={uuidv4()} />;
          })}
        </select>
      </>
    );
  };

  const GameStats = (): JSX.Element => {
    return (
      <>
        <p>Total games played: {allGame?.allPlayedGame}</p>
        <p>All correct answers: {allGame?.allCorrectAnswer}</p>
        <p>Accuracy: {allGame?.accuracy} %</p>
      </>
    );
  };

  const RecordStats = (): JSX.Element => {
    return (
      <>
        <p>Most points earned: {myRecords?.maxEarnPoints}</p>
        <p>Best accuracy: {myRecords?.bestAccuracy} %</p>
        <p>Longest game: {myRecords?.longestGame}</p>
        <p>Shortest game: {myRecords?.shortestGame}</p>
      </>
    );
  };

  const Results = ({
    result,
  }: {
    result: {
      playedGame: number;
      correctAnswer: number;
      accuracy: number;
      earnPoints: number;
      date: string;
    };
  }) => {
    const { date, playedGame, correctAnswer, accuracy, earnPoints } = result;
    return (
      <div>
        <ul className="flex justify-between  border ">
          <li className="basis-4/12 border">{date.replace("_", " ")}</li>
          <li className="basis-2/12 border">{playedGame}</li>
          <li className="basis-2/12 border">{correctAnswer}</li>
          <li className="basis-2/12 border">{earnPoints}</li>
          <li className="basis-2/12 border">{accuracy}</li>
        </ul>
      </div>
    );
  };

  const Content = () => {
    return (
      <div className="max-h-[65%] overflow-auto  w-11/12 m-auto">
        <div>
          {selectedCategory !== undefined && (
            <>
              <h2 className="font-bold text-2xl dark:text-pink-500 text-pink-700 m-3">
                Statics of all games
              </h2>
              <GameStats />
              <h2 className="font-bold text-2xl dark:text-pink-500 text-pink-700 m-3">
                Records
              </h2>
              <RecordStats />
              <h2 className="font-bold text-2xl dark:text-pink-500 text-pink-700 m-3">
                All games
              </h2>
              <div>
                <ul className="flex justify-between border dark:text-pink-500 text-pink-700">
                  <li className="basis-4/12 border">
                    <BsFillCalendarDateFill className="m-auto text-xl" />
                  </li>
                  <li className="basis-2/12 border">
                    <AiFillFire className="m-auto text-xl" />
                  </li>
                  <li className="basis-2/12 border">
                    <AiOutlineCheck className="m-auto text-xl" />
                  </li>
                  <li className="basis-2/12 border">
                    <AiFillStar className="m-auto text-xl" />
                  </li>
                  <li className="basis-2/12 border">
                    <AiOutlinePercentage className="m-auto text-xl" />
                  </li>
                </ul>
              </div>
              <div className="border">
                {allPlayedGameStats?.map((result) => (
                  <Results key={uuidv4()} result={result} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="w-full text-center h-5/6 ">
        <h1 className="font-bold text-5xl dark:text-pink-500 text-pink-700 mb-3">
          Profile
        </h1>
        <Link to="/">
          <button
            className="dark:text-pink-500 text-pink-700 underline"
            onClick={clearLocalStorageData}
          >
            Delete your results
          </button>
        </Link>
        <SelectList />
        <Content />
        <div className="fixed top-2 right-3">
          <Link
            to="/"
            className="duration-200 text-3xl  hover:dark:text-pink-700 hover:text-pink-500  font-bold"
          >
            <BiHomeAlt2 />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default User;
