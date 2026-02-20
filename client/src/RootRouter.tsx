import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage.tsx";
import GamePage from "./pages/GamePage";
import LoadingPage from "./pages/LoadingPage.tsx";
import useRoomState from "./hooks/http/room/useRoomState.ts";
import useGameState from "./hooks/socket/game/useGameState.ts";
import {GameStatus} from "./type/game/GameState.ts";
import {useConnectionStateProvider} from "./stateProvider/connection/ConnectionStateProvider.tsx";
import {useGameStateProvider} from "./stateProvider/game/GameStateProvider.tsx";
import {useState} from "react";
import useJoinRoom from "./hooks/socket/connection/useJoinRoom.ts";

export default function RootRouter() {
  const [{ roomId }] = useConnectionStateProvider();
  const [{ gameStatus }] = useGameStateProvider();
  const [pageLoading, setPageLoading] = useState(false);

  useJoinRoom()
  useRoomState();
  useGameState();

  if (pageLoading) return <LoadingPage />;
  if (gameStatus === GameStatus.PLAYING) return <GamePage />;
  if (roomId) return <LobbyPage setPageLoading={setPageLoading} />;

  return <HomePage />;
}