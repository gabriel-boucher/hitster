import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage";
import { useStateProvider } from "./utils/StateProvider";
import { gameStates } from "@shared/constants";
import GamePage from "./pages/GamePage";

export default function RootRouter() {
  const [{ gameState }] = useStateProvider();

  const roomId = window.location.pathname.substring(1) || "";

  if (gameState === gameStates.PLAYING) {
    return <GamePage />;
  }
  else if (roomId) {
    return <LobbyPage />;
  }
  return <HomePage />;
}
