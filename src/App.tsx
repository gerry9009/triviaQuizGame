import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import EndGame from "./pages/EndGame/EndGame";
import User from "./pages/User/User";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/finished" element={<EndGame />} />
      <Route path="/user" element={<User />} />
    </Routes>
  );
}

export default App;
