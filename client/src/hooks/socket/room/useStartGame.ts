import {RoomSocketEvents} from "./roomSocketEvents.ts";
import {useStateProvider} from "../../../utils/StateProvider.tsx";
import {useCallback} from "react";
import {EventResponse} from "../../../type/EventResponse.ts";

export default function useStartGame() {
  const [{ socket, roomId, playerId }] = useStateProvider();

  return useCallback((setLoading: (loading: boolean) => void) => {
    const callback = (response: EventResponse<undefined>) => {
      setLoading(false);
      if (response && response.message) {
        console.log(response.message); // make a toast notification later
      }
    }

    setLoading(true);
    socket.emit(RoomSocketEvents.START_GAME, { roomId, playerId,}, callback);
  }, [socket, roomId, playerId]);
}