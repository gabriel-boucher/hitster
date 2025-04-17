import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/Constants";
import { gameStates, socketEvents } from "@shared/Constants";
import { useRef } from "react";

export default function App() {
  const [
    { socket, gameState, players },
    dispatch,
  ] = useStateProvider();
  const isUpdatingFromServer = useRef(false);

  socket.on(
    socketEvents.UPDATE_GAME_STATE,
    ({ gameState, players, activePlayer, items, activeCard }) => {
      isUpdatingFromServer.current = true;
      dispatch({ type: reducerCases.SET_GAME_STATE, gameState });
      dispatch({ type: reducerCases.SET_PLAYERS, players });
      dispatch({ type: reducerCases.SET_ACTIVE_PLAYER, activePlayer });
      dispatch({ type: reducerCases.SET_ITEMS, items });
      dispatch({ type: reducerCases.SET_ACTIVE_CARD, activeCard });
    }
  );

  function page() {
    if (players.find((player) => player.socketId === socket.id)) {
      if (gameState === gameStates.LOBBY) {
        return <LobbyPage />;
      } else {
        return <GamePage />;
      }
    } else {
      return <HomePage />;
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:roomId" element={page()} />
      </Routes>
    </Router>
  );
}
