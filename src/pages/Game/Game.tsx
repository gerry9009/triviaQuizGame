import React, { useContext } from "react";
import Layout from "../../components/Layout";
import { GameContext } from "../../context/GameContext";
import { v4 as uuidv4 } from "uuid";

const Game = () => {
  const { playingQuestion, playingAnswers } = useContext(GameContext) || {};
  return (
    <Layout>
      <>
        <p>{playingQuestion}</p>
        <li>
          {" "}
          {playingAnswers?.map((answer) => {
            return <ul key={uuidv4()}>{answer}</ul>;
          })}
        </li>
      </>
    </Layout>
  );
};

export default Game;
