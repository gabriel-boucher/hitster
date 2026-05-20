import { useCallback } from "react";
import { EventResponse } from "../../../type/EventResponse.ts";
import { CreateRoomResponse } from "../../../type/room/CreateRoomResponse.ts";
import { HTTP_SERVER_URL } from "../../../config/url.ts";
import axios from "axios";
import { RoomId } from "../../../type/room/RoomState.ts";
import { RoomHttpEvents } from "./roomHttpEvents.ts";
import {useNavigate} from "react-router-dom";

export default function useCreateRoom() {
  const navigate = useNavigate();

  return useCallback(async () => {
    const response = await createRoom();
    if (!response.success || !response.data) return;

    const newRoomId: RoomId = response.data.gameId;
    navigate(newRoomId);
  }, [navigate]);
}

async function createRoom(): Promise<EventResponse<CreateRoomResponse>> {
  const response = await axios.post(
      `${HTTP_SERVER_URL}/api/room/${RoomHttpEvents.CREATE_ROOM}`
  );
  return response.data;
}