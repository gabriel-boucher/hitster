import { useCallback } from "react";
import { EventResponse } from "../../../type/EventResponse.ts";
import { CreateRoomResponse } from "../../../type/room/CreateRoomResponse.ts";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import axios from "axios";
import { RoomId } from "../../../type/room/RoomState.ts";
import { useConnectionStateProvider } from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import { connectionReducerCases } from "../../../stateProvider/connection/ConnectionReducerCases.ts";
import { RoomHttpEvents } from "./roomHttpEvents.ts";

export default function useCreateRoom() {
  const [, connectionDispatch] = useConnectionStateProvider();

  return useCallback(async () => {
    const response = await createRoom();
    if (!response.success || !response.data) return;

    const newRoomId: RoomId = response.data.roomId;
    window.history.pushState({}, "", "/" + newRoomId);
    connectionDispatch({ type: connectionReducerCases.SET_ROOM_ID, roomId: newRoomId });
  }, [connectionDispatch]);
}

async function createRoom(): Promise<EventResponse<CreateRoomResponse>> {
  const response = await axios.post(
      `${HTTP_SERVER_URL}/api/room/${RoomHttpEvents.CREATE_ROOM}`
  );
  return response.data;
}