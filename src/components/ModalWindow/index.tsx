import { useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {
  functionality: () => void;
  message: string;
  route: string;
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalWindow = ({
  functionality,
  message,
  route,
  state,
  setState,
}: Props) => {
  const handleClickWindow = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const elementType = target.tagName;

    const isItClose = elementType === "DIV" || elementType === "H2";
    if (state && isItClose) {
      setState((state) => !state);
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
        state ? "visible" : "hidden"
      } fixed top-0 left-0 w-full h-full  bg-gray-900/95 z-10 text-white flex flex-col justify-center items-center text-4xl`}
    >
      <h2 className="text-5xl mb-20 font-bold text-center">{message}</h2>
      <div className="mt-20  flex flex-row w-full h-1/5 sm:w-4/5 md:w-3/5 max-w-[800px] justify-around items-center flex-wrap gap-x-20 ">
        <Link
          to={route}
          className="w-5/12 max-w-[175px] min-w-[125px] text-center button"
        >
          <button onClick={functionality}>Yes</button>
        </Link>
        <button
          onClick={() => setState((state) => !state)}
          className="w-5/12 max-w-[175px] min-w-[125px] text-center button"
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ModalWindow;
