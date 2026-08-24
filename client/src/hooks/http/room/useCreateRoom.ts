import { useCallback } from "react";
import { EventResponse } from "../../../type/EventResponse.ts";
import { CreateRoomResponse } from "../../../type/room/CreateRoomResponse.ts";
import { RoomId } from "../../../type/room/RoomState.ts";
import { useNavigate } from "react-router-dom";
import { apiPaths } from "../../../config/apiPaths.ts";
import { api } from "../apiRequest.ts";

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
  const response = await api.post(apiPaths.createRoom());
  return response.data;
}
