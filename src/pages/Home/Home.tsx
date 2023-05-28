import { useContext } from "react";
import Layout from "../../components/Layout";
import { GameContext } from "../../context/GameContext";
import Welcome from "../../components/Welcome";
import Main from "../../components/Main";

const Home = () => {
  const { openWindow } = useContext(GameContext) || {};
  return <Layout>{openWindow ? <Welcome /> : <Main />}</Layout>;
};

export default Home;
