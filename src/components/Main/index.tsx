import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import { v4 as uuidv4 } from "uuid";

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
              className="text-gray-100 py-2 px-8 my-1 dark:bg-pink-500 bg-pink-700 duration-200 rounded-lg hover:dark:bg-pink-700 hover:bg-pink-500 font-bold"
              onClick={handleClick}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Main;
