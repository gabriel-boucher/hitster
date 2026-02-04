import {useCallback} from "react";
import {PlayerId} from "../../../type/player/Player.ts";
import {ConnectionType, getBaseUrl} from "../../../utils/constants.ts";
import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {EventResponse, EventResponseStatus} from "../../../type/EventResponse.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {connectionReducerCases} from "../../../stateProvider/connection/ConnectionReducerCases.ts";

export default function useJoinRoom() {
  const [{ socket }, connectionDispatch] = useConnectionStateProvider();

  return useCallback((roomId: string, onComplete?: (success: boolean) => void) => {
    const playerId: PlayerId = socket.id as PlayerId;

    const callback = (response: EventResponse<undefined>) => {
      const failedWithRoomNotFound = response?.success === false && response.status === EventResponseStatus.ROOM_NOT_FOUND;

      if (failedWithRoomNotFound) {
        window.location.href = getBaseUrl(ConnectionType.CLIENT);
      } else {
        connectionDispatch({type: connectionReducerCases.SET_PLAYER_ID, playerId: socket.id as PlayerId});
      }

      onComplete?.(!failedWithRoomNotFound);
    }

    socket.emit(RoomSocketEvents.JOIN_ROOM, {roomId, playerId}, callback);
  }, [socket]);
}