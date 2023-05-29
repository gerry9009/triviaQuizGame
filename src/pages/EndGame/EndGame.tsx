import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

const EndGame = () => {
  const { settledCategory, userPoints, userPlayedGame, userCorrectAnswer } =
    useContext(GameContext) || {};

  let percent = 0;
  if (userCorrectAnswer && userPlayedGame) {
    percent = Math.round((userCorrectAnswer / userPlayedGame) * 100);
  }

  return (
    <Layout>
      <div className="text-center">
        <h1 className="font-bold text-5xl dark:text-pink-500 text-pink-700 pb-10">
          Congratulations!
        </h1>
        <p className="my-2 text-2xl">
          You earn{" "}
          <span className="dark:text-pink-500 text-pink-700 font-bold">
            {userPoints}
          </span>{" "}
          points in{" "}
          <span className="dark:text-pink-500 text-pink-700 font-bold">
            {settledCategory}
          </span>{" "}
          category
        </p>
        <p className="my-2  text-2xl">
          You played{" "}
          <span className="dark:text-pink-500 text-pink-700 font-bold">
            {userPlayedGame}
          </span>{" "}
          Games
        </p>
        <p className="my-2  text-2xl">
          <span className="dark:text-pink-500 text-pink-700 font-bold">
            {userCorrectAnswer}
          </span>{" "}
          times answered correctly
        </p>
        <p className="mb-10 text-2xl dark:text-pink-500 text-pink-700 font-bold">
          {userPlayedGame} Games / {userCorrectAnswer} correct answer /{" "}
          {percent} % / {userPoints} Points{" "}
        </p>

        <Link className="button" to="/">
          New Game
        </Link>
      </div>
    </Layout>
  );
};

export default EndGame;
