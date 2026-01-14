import {useCallback} from "react";
import {ConnectionType, getBaseUrl, reducerCases} from "../../../utils/constants.ts";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {EventResponse} from "../../../type/EventResponse.ts";
import {CreateRoomResponse} from "../../../type/room/CreateRoomResponse.ts";

export default function useCreateRoom() {
  const [{ socket }, dispatch] = useStateProvider();

  return useCallback((accessCode: string, onComplete?: (success: boolean) => void) => {
    const callback = (response: EventResponse<CreateRoomResponse>) => {
      const roomId = response.data?.roomId;

      if (response.success && roomId) {
        window.history.pushState({}, "", "/" + roomId);
        dispatch({type: reducerCases.SET_ROOM_ID, roomId: roomId});
        onComplete?.(true);
      } else {
        window.location.href = getBaseUrl(ConnectionType.CLIENT);
        onComplete?.(false);
      }
    }

    socket.emit(RoomSocketEvents.CREATE_ROOM, {accessCode}, callback);
  }, [socket, dispatch]);
}