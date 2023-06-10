import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

import {
  AiFillFire,
  AiOutlineCheck,
  AiOutlinePercentage,
  AiFillStar,
} from "react-icons/ai";

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
        <h1 className="font-bold text-5xl dark:text-pink-500 text-pink-700">
          Congratulations!
        </h1>
        <div className="my-5 flex justify-around w-5/6 m-auto text-2xl dark:text-pink-500 text-pink-700 font-bold">
          <div>
            <p>
              <AiFillFire className="m-auto text-xl" />
            </p>
            <p>{userPlayedGame}</p>
          </div>
          <div>
            <p>
              <AiOutlineCheck className="m-auto text-xl" />
            </p>
            <p>{userCorrectAnswer}</p>
          </div>
          <div>
            <p>
              <AiOutlinePercentage className="m-auto text-xl" />
            </p>
            <p>{percent}</p>
          </div>
          <div>
            <p>
              <AiFillStar className="m-auto text-xl" />
            </p>
            <p>{userPoints}</p>
          </div>
        </div>
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
        <p className="mt-2  text-2xl mb-10">
          <span className="dark:text-pink-500 text-pink-700 font-bold">
            {userCorrectAnswer}
          </span>{" "}
          times answered correctly
        </p>

        <Link className="button " to="/">
          New Game
        </Link>
      </div>
    </Layout>
  );
};

export default EndGame;
