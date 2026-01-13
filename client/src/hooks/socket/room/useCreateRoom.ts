import { useEffect } from "react";
import { reducerCases } from "../../../utils/constants.ts";
import { RoomId } from "../../../type/room/RoomState.ts";
import { useStateProvider } from "../../../utils/StateProvider.tsx";
import {RoomSocketEvents} from "./roomSocketEvents.ts";

export default function useCreateRoom() {
  const [{ socket }, dispatch] = useStateProvider();
  const accessCode = new URLSearchParams(window.location.search).get("code");

  useEffect(() => {
    if (accessCode) {
      socket.emit(RoomSocketEvents.CREATE_ROOM, { accessCode }, (roomId: RoomId) => {
        dispatch({ type: reducerCases.SET_ROOM_ID, roomId: roomId });
        window.history.pushState({}, "", "/" + roomId);
      });
    }
  }, [accessCode, socket, dispatch]);
}