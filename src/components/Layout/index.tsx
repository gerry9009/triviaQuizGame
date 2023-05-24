import Footer from "../Footer";
import DarkModeToggle from "../DarkModeToggle";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="h-screen bg-gray-100 text-slate-950 dark:bg-slate-950 dark:text-gray-100 flex flex-col justify-center items-center">
      <DarkModeToggle />
      {children}
      <div className=" absolute left-0 right-0 bottom-0">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
