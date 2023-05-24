import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

function Main() {
  const { categories, fetchAPI } = useContext(GameContext) || {};

  const listOfCategories: string[] = categories ? Object.keys(categories) : [];

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    const value = target.innerHTML.replace(/&amp;/g, "&");

    //TODO: send a request to the API
    if (fetchAPI) {
      fetchAPI(value);
    }
  };

  return (
    <div className="flex flex-col  h-5/6">
      <h1 className="text-5xl">Trivia Quiz</h1>
      <div className="flex flex-col justify-center  h-full">
        {listOfCategories.map((category) => {
          return (
            <button
              key={uuidv4()}
              className="button my-1"
              onClick={handleClick}
            >
              <Link to="/game">{category}</Link>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
