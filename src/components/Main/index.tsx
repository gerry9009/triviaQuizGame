import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";

function Main() {
  const { categories, gameStart } = useContext(GameContext) || {};

  const listOfCategories: string[] = categories ? Object.keys(categories) : [];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const value = target.innerHTML.replace(/&amp;/g, "&");

    if (gameStart) {
      gameStart(value);
    }
  };

  return (
    <div className="flex flex-col  h-5/6">
      <h1 className="text-5xl dark:text-pink-500 text-pink-700 font-bold">
        Trivia Quiz
      </h1>
      <div className="flex flex-col justify-center h-full">
        {listOfCategories.map((category) => {
          return (
            <Link className="my-1" to="/game" key={uuidv4()}>
              <button className="w-full button" onClick={handleClick}>
                {category}
              </button>
            </Link>
          );
        })}
      </div>
      <div className="fixed top-2 right-3">
        <Link
          to={"user"}
          className="duration-200 text-3xl  hover:dark:text-pink-700 hover:text-pink-500  font-bold"
        >
          <CgProfile />
        </Link>
      </div>
    </div>
  );
}

export default Main;
