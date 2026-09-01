import LobbyPage from "./pages/LobbyPage.tsx";
import GamePage from "./pages/GamePage";
import LoadingPage from "./pages/LoadingPage.tsx";
import {useState} from "react";
import JoinPage from "./pages/JoinPage.tsx";
import {GameStatus} from "./type/game/GameState.ts";
import {useGameStateProvider} from "./stateProvider/game/GameStateProvider.tsx";

export default function RoomRoute() {
  const [{ gameStatus }] = useGameStateProvider();
  const [pageLoading, setPageLoading] = useState(false);

  if (pageLoading) return <LoadingPage />;

  if (gameStatus === undefined) return <JoinPage />;
  if (gameStatus === GameStatus.LOBBY) return <LobbyPage setPageLoading={setPageLoading} />;
  if (gameStatus === GameStatus.PLAYING) return <GamePage />;
}