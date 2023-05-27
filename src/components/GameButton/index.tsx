import React, { useContext } from "react";
import { GameContext } from "../../context/GameContext";

type Props = {
  answer: string;
  handleBtn: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isClicked: boolean;
};

const GameButton = ({ answer, handleBtn, isClicked }: Props) => {
  const { responseUser, correctAnswer, disabledBtns } =
    useContext(GameContext) || {};

  const correct =
    responseUser && answer === correctAnswer
      ? "bg-green-500 border-green-500 text-white"
      : "";

  const inCorrect =
    isClicked && responseUser && answer !== correctAnswer
      ? "bg-red-800 border-red-800"
      : "";

  const toggleClassClicked = isClicked
    ? "bg-pink-500 border-pink-500 text-white"
    : "";
  return (
    <button
      className={`${toggleClassClicked} ${correct} ${inCorrect} border-4 border-black dark:border-white hover:border-pink-500 hover:dark:border-pink-500 py-4 duration-200 rounded text-xl w-full sm:w-[45%] text-center cursor-pointer my-2`}
      onClick={handleBtn}
      disabled={disabledBtns}
    >
      {answer}
    </button>
  );
};

export default GameButton;
