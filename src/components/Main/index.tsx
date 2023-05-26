import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

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
      <h1 className="text-5xl">Trivia Quiz</h1>
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
    </div>
  );
}

export default Main;
