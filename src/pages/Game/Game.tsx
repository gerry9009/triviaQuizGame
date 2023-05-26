import React, { useContext } from "react";
import Layout from "../../components/Layout";
import { GameContext } from "../../context/GameContext";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const Game = () => {
  const { playingQuestion, playingAnswers, gamePlay } =
    useContext(GameContext) || {};

  const DefaultContent = () => {
    return (
      <div className="flex flex-col items-center gap-10">
        <h2 className="font-bold text-3xl dark:text-pink-500 text-pink-700">
          You have no games in progress
        </h2>
        <Link to="/" className="button">
          Back
        </Link>
      </div>
    );
  };

  const GameContent = () => {
    return (
      <div className="w-4/5">
        <h2 className="text-3xl font-bold">{playingQuestion}</h2>
        <li className="flex flex-wrap justify-between my-10  w-full">
          {playingAnswers?.map((answer) => {
            return (
              <ul
                key={uuidv4()}
                className="button w-full sm:w-[45%] text-center cursor-pointer my-2"
                onClick={gamePlay}
              >
                <p>{answer}</p>
              </ul>
            );
          })}
        </li>
      </div>
    );
  };

  return (
    <Layout>{playingQuestion ? <GameContent /> : <DefaultContent />}</Layout>
  );
};

export default Game;
