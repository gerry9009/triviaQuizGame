const Footer = () => {
  return (
    <footer className=" flex justify-center py-1">
      <div className="flex flex-col items-center gap-2">
        <p>
          Copyright <span>&copy;</span> 2023{" "}
          <a
            href="https://gergobuglyo.com/"
            className="hover:text-pink-500 ease-in duration-200 underline underline-offset-2"
          >
            Buglyó Gergő
          </a>
        </p>
        <p>
          Puzzles from:{" "}
          <a
            href="https://trivia.willfry.co.uk/"
            className="hover:text-pink-500 ease-in duration-200 underline underline-offset-2"
          >
            Trivia - Will Fry
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
