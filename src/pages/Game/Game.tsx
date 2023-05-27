import React, { useContext } from "react";
import Layout from "../../components/Layout";
import { GameContext } from "../../context/GameContext";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import GameButton from "../../components/GameButton";
import { AiFillCloseCircle } from "react-icons/ai";

const Game = () => {
  const {
    playingQuestion,
    playingAnswers,
    gamePlay,
    clickedIndex,
    setClickedIndex,
    setDisabledBtns,
    userPoints,
    playedGame,
    settingData,
  } = useContext(GameContext) || {};

  const handleButton = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    const target = e.target as HTMLButtonElement;
    const value = target.innerHTML.replace(/&amp;/g, "&");
    if (setClickedIndex) {
      setClickedIndex(index);
    }

    if (setDisabledBtns) {
      setDisabledBtns(true);
    }

    if (gamePlay) {
      gamePlay(value);
    }
  };

  const handleExitButton = () => {
    // set question data to default
    if (settingData) {
      settingData("", "", "", []);
    }
  };

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
        <h2 className="text-2xl text-center">
          {userPoints} Point(s) / {playedGame} Game(s)
        </h2>
        <h3 className="text-3xl font-bold mt-5">{playingQuestion}</h3>
        <div className="flex flex-wrap justify-between my-10  w-full">
          {playingAnswers?.map((answer, index) => {
            const isClicked = clickedIndex === index;
            return (
              <GameButton
                key={uuidv4()}
                answer={answer}
                handleBtn={(e) => handleButton(e, index)}
                isClicked={isClicked}
              />
            );
          })}
        </div>
        <div className="fixed top-2 right-3">
          <Link to="/">
            <button
              className="duration-200 text-3xl  hover:dark:text-pink-700 hover:text-pink-500  font-bold"
              onClick={handleExitButton}
            >
              <AiFillCloseCircle />
            </button>
          </Link>
        </div>
      </div>
    );
  };

  return (
    <Layout>{playingQuestion ? <GameContent /> : <DefaultContent />}</Layout>
  );
};

export default Game;
