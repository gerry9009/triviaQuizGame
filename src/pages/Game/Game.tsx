import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { GameContext } from "../../context/GameContext";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import GameButton from "../../components/GameButton";
import { AiFillCloseCircle, AiFillFire, AiFillStar } from "react-icons/ai";
import ModalWindow from "../../components/ModalWindow";

const Game = () => {
  const {
    playingQuestion,
    playingAnswers,
    gamePlay,
    clickedIndex,
    setClickedIndex,
    setDisabledBtns,
    userPoints,
    userPlayedGame,
    settingData,
    setLocalStorageData,
  } = useContext(GameContext) || {};

  const [isVisible, setIsVisible] = useState(false);

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
    if (setLocalStorageData) {
      setLocalStorageData();
    }
    // set question data to default
    if (settingData) {
      settingData("", "", "", []);
    }
  };

  const handleCloseButton = () => {
    setIsVisible((isVisible) => !isVisible);
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
        <div className="text-4xl text-center flex justify-between">
          <div className="flex">
            <AiFillStar /> {userPoints}
          </div>
          <div className="flex">
            {userPlayedGame} <AiFillFire />
          </div>
        </div>
        <h3 className="text-2xl font-bold mt-1">{playingQuestion}</h3>

        <div className="flex flex-wrap justify-between my-2  w-full  overflow-auto max-h-[50vh]">
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
          <button
            className="duration-200 text-3xl  hover:dark:text-pink-700 hover:text-pink-500  font-bold"
            onClick={handleCloseButton}
          >
            <AiFillCloseCircle />
          </button>
        </div>
        <ModalWindow
          functionality={handleExitButton}
          message="Do you want to stop the game with the current result?"
          route="/finished"
          state={isVisible}
          setState={setIsVisible}
        />
      </div>
    );
  };

  return (
    <Layout>{playingQuestion ? <GameContent /> : <DefaultContent />}</Layout>
  );
};

export default Game;
