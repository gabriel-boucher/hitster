import {useCallback} from "react";
import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {EventResponse} from "../../../type/EventResponse.ts";
import {CreateRoomResponse} from "../../../type/room/CreateRoomResponse.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {connectionReducerCases} from "../../../stateProvider/connection/ConnectionReducerCases.ts";
import {CLIENT_URL} from "../../../config/url.ts";

export default function useCreateRoom() {
  const [{ socket }, connectionDispatch] = useConnectionStateProvider();

  return useCallback((accessCode: string, onComplete?: (success: boolean) => void) => {
    const callback = (response: EventResponse<CreateRoomResponse>) => {
      const roomId = response.data?.roomId;

      if (response.success && roomId) {
        window.history.pushState({}, "", "/" + roomId);
        connectionDispatch({type: connectionReducerCases.SET_ROOM_ID, roomId: roomId});
        onComplete?.(true);
      } else {
        window.location.href = CLIENT_URL;
        onComplete?.(false);
      }
    }

    socket.emit(RoomSocketEvents.CREATE_ROOM, {accessCode}, callback);
  }, [socket, connectionDispatch]);
}