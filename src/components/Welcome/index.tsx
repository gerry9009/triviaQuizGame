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
      <h1 className="font-bold">Welcome in Trivia Quiz</h1>
      <p>Earn the maximum points in each category</p>
      <button onClick={handleButton}>OK</button>
    </div>
  );
};

export default Welcome;
