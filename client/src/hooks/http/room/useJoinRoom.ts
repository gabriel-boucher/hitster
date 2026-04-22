import {useEffect} from "react";
import {PlayerId} from "../../../type/player/Player.ts";
import {EventResponse} from "../../../type/EventResponse.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {connectionReducerCases} from "../../../stateProvider/connection/ConnectionReducerCases.ts";
import {CLIENT_URL, HTTP_SERVER_URL} from "../../../config/url.ts";
import {RoomId, RoomState} from "../../../type/room/RoomState.ts";
import axios from "axios";
import {RoomHttpEvents} from "./roomHttpEvents.ts";

export default function useJoinRoom() {
  const [{ socket }, connectionDispatch] = useConnectionStateProvider();

  useEffect(() => {
    if (!socket) return;

    const newRoomId: RoomId = window.location.pathname.substring(1) || "";
    const newPlayerId = socket.id as PlayerId;
    if (!newRoomId || !newPlayerId) return;

    const join = async () => {
      const response = await joinRoom(newPlayerId, newRoomId);
      if (!response.success) {
        window.location.href = CLIENT_URL;
        return;
      }

      connectionDispatch({ type: connectionReducerCases.SET_ROOM_ID, roomId: newRoomId });
      connectionDispatch({ type: connectionReducerCases.SET_PLAYER_ID, playerId: newPlayerId });
    }

    join();
  }, [socket, connectionDispatch]);
}

async function joinRoom(playerId: PlayerId, roomId: RoomId): Promise<EventResponse<RoomState>> {
  const response = await axios.post(
      `${HTTP_SERVER_URL}/api/room/${RoomHttpEvents.JOIN_ROOM}`,
      {
        roomId,
        playerId,
      }
  );
  return response.data;
}