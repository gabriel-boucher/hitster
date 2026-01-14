import HomePage from "./pages/HomePage";
import LobbyPage from "./pages/LobbyPage";
import {useStateProvider} from "./utils/StateProvider";
import {gameStates} from "@shared/constants";
import GamePage from "./pages/GamePage";
import LoadingPage from "./pages/LoadingPage.tsx";
import useRoomState from "./hooks/socket/room/useRoomState.ts";
import useRoomInitialization from "./hooks/socket/room/useRoomInitialization.ts";
import {useCallback} from "react";

export default function RootRouter() {
  const [{ gameState, roomId }] = useStateProvider();
  const { loading, setLoading } = useRoomInitialization();

  useRoomState();

  return useCallback(() => {
    if (loading) return <LoadingPage />;
    if (gameState === gameStates.PLAYING) return <GamePage />;
    if (roomId) return <LobbyPage setLoading={setLoading} />;

    return <HomePage setLoading={setLoading} />;
  }, [loading, gameState, roomId, setLoading])();
}