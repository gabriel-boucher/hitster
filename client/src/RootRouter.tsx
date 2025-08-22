import { useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage";
import { useStateProvider } from "./utils/StateProvider";
import { gameStates } from "@shared/constants";
import GamePage from "./pages/GamePage";

export default function RootRouter() {
  const [{ gameState }] = useStateProvider();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const roomId = params.get("code");

  if (gameState === gameStates.PLAYING) {
    return <GamePage />;
  }
  else if (roomId) {
    return <LobbyPage />;
  }
  return <HomePage />;
}
