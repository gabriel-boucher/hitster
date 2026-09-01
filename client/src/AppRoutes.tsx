import "./App.css";
import { Routes, Route } from "react-router-dom";
import RoomRoute from "./RoomRoute.tsx";
import SpotifyCallbackPage from "./pages/SpotifyCallbackPage";
import CreatePage from "./pages/CreatePage.tsx";
import HomePage from "./pages/HomePage.tsx";
import JoinPage from "./pages/JoinPage.tsx";
import useRoomState from "./hooks/socket/useRoomState.ts";
import useGameState from "./hooks/socket/useGameState.ts";
import useDisconnect from "./hooks/socket/connection/useDisconnect.ts";
import useLeaveRoom from "./hooks/socket/connection/useLeaveRoom.ts";

export default function AppRoutes() {
  useDisconnect();
  useLeaveRoom();
  useRoomState();
  useGameState();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/:roomId" element={<RoomRoute />} />
      <Route path="/spotify-callback" element={<SpotifyCallbackPage />} />
    </Routes>
  );
}