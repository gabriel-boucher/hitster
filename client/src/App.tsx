import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/constants";
import { socketEvents } from "@shared/constants";
import RootRouter from "./RootRouter";

export default function App() {
  const [{ socket }, dispatch] = useStateProvider();

  socket.on(socketEvents.UPDATE_GAME_STATE, ({ gameState, players, items }) => {
    dispatch({ type: reducerCases.SET_GAME_STATE, gameState });
    dispatch({ type: reducerCases.SET_PLAYERS, players });
    dispatch({ type: reducerCases.SET_ITEMS, items });
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootRouter />} />
      </Routes>
    </Router>
  );
}
