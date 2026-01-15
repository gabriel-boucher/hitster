import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage";
import {useStateProvider} from "./utils/StateProvider";
import GamePage from "./pages/GamePage";
import LoadingPage from "./pages/LoadingPage.tsx";
import useRoomState from "./hooks/socket/room/useRoomState.ts";
import useRoomInitialization from "./hooks/socket/room/useRoomInitialization.ts";
import useGameState from "./hooks/socket/game/useGameState.ts";
import {GameStatus} from "./type/game/GameState.ts";

export default function RootRouter() {
  const [{ gameStatus, roomId }] = useStateProvider();
  const { loading, setLoading } = useRoomInitialization();

  useRoomState();
  useGameState();

  if (loading) return <LoadingPage />;
  if (gameStatus === GameStatus.PLAYING) return <GamePage />;
  if (roomId) return <LobbyPage setLoading={setLoading} />;

  return <HomePage setLoading={setLoading} />;
}