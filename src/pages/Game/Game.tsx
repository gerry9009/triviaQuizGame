import React, { useContext, useEffect, useState } from "react";
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
    userPlayedGame,
    settingData,
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

  const ModalWindow = () => {
    const handleClickWindow = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const elementType = target.tagName;

      const isItClose = elementType === "DIV" || elementType === "H2";
      if (isVisible && isItClose) {
        setIsVisible((isVisible) => !isVisible);
      }
    };

    useEffect(() => {
      window.addEventListener("click", handleClickWindow);

      return () => {
        window.removeEventListener("click", handleClickWindow);
      };
    }, []);

    return (
      <div
        className={`${
          isVisible ? "visible" : "hidden"
        } fixed top-0 left-0 w-full h-full  bg-gray-900/95 z-10 text-white flex flex-col justify-center items-center text-4xl`}
      >
        <h2 className="text-5xl mb-20 font-bold text-center">
          Want to stop your game with the current result?
        </h2>
        <div className="mt-20  flex flex-row w-full h-1/5 sm:w-4/5 md:w-3/5 max-w-[800px] justify-around items-center flex-wrap gap-x-20 ">
          <Link
            to="/finished"
            className="w-5/12 max-w-[175px] min-w-[125px] text-center button"
          >
            <button onClick={handleExitButton}>Yes</button>
          </Link>
          <button
            onClick={() => setIsVisible((isVisible) => !isVisible)}
            className="w-5/12 max-w-[175px] min-w-[125px] text-center button"
          >
            No
          </button>
        </div>
      </div>
    );
  };

  const GameContent = () => {
    return (
      <div className="w-4/5">
        <h2 className="text-2xl text-center">
          {userPoints} Point(s) / {userPlayedGame} Game(s)
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
          <button
            className="duration-200 text-3xl  hover:dark:text-pink-700 hover:text-pink-500  font-bold"
            onClick={handleCloseButton}
          >
            <AiFillCloseCircle />
          </button>
        </div>
        <ModalWindow />
      </div>
    );
  };

  return (
    <Layout>{playingQuestion ? <GameContent /> : <DefaultContent />}</Layout>
  );
};

export default Game;
