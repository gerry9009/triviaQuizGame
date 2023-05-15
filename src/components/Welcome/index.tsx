type Props = {
  setOpenWindow: React.Dispatch<React.SetStateAction<boolean>>;
};

const Welcome = ({ setOpenWindow }: Props) => {
  const handleButton = () => {
    setOpenWindow(false);
  };

  //bg-gray-100 text-slate-950 dark:bg-slate-950 dark:text-gray-100
  return (
    <div className=" text-center ">
      <h1 className="font-bold text-5xl dark:text-pink-500 text-pink-700">
        Welcome in the Trivia Quiz
      </h1>
      <p className="py-10 text-2xl">Earn the maximum points in each category</p>
      <button
        onClick={handleButton}
        className="dark:bg-pink-500 bg-pink-700 duration-200 hover:dark:bg-pink-700 hover:bg-pink-500 py-2 px-8 rounded-lg text-gray-100 font-bold"
      >
        START
      </button>
    </div>
  );
};

export default Welcome;
