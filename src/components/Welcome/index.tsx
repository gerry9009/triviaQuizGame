import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

const Welcome = () => {
  const { setOpenWindow } = useContext(GameContext) || {};

  const handleButton = () => {
    if (setOpenWindow) {
      setOpenWindow(false);
    }
  };

  //bg-gray-100 text-slate-950 dark:bg-slate-950 dark:text-gray-100
  return (
    <div className=" text-center ">
      <h1 className="font-bold text-5xl dark:text-pink-500 text-pink-700">
        Welcome in the Trivia Quiz
      </h1>
      <p className="py-10 text-2xl">Earn the maximum points in each category</p>
      <button onClick={handleButton} className="button">
        START
      </button>
    </div>
  );
};

export default Welcome;
