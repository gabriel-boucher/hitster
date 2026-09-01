import {useEffect} from "react";
import {EventResponse} from "../../../type/EventResponse.ts";
import {RoomId} from "../../../type/room/RoomState.ts";
import {PlayerId} from "../../../type/player/Player.ts";
import {apiPaths} from "../../../config/apiPaths.ts";
import {api} from "../apiRequest.ts";
import {useConnectionStateProvider} from "../../../stateProvider/connection/ConnectionStateProvider.tsx";
import {ConnectRoomResponse} from "../../../type/room/ConnectRoomResponse.ts";
import {CHARS, LENGTH} from "../../../components/elements/GameCode.tsx";

interface Props {
  setUsername: (username: string) => void;
  setUsernames: (usernames: string[]) => void;
  setShowUsernameInput: (show: boolean) => void;
  setDisableUsernameInput: (disable: boolean) => void;
  setRoomIdErrorMessage: (message: string) => void;
}

export default function useConnectRoom({ setUsername, setUsernames, setShowUsernameInput, setDisableUsernameInput, setRoomIdErrorMessage }: Props) {
  const [{ roomId }] = useConnectionStateProvider();

  useEffect(() => {
    if (roomId.length != LENGTH) {
      return;
    }

    for (let i = 0; i < roomId.length; i++) {
      if (CHARS.indexOf(roomId.charAt(i)) == -1) {
        return;
      }
    }

    const playerId: PlayerId = localStorage.getItem("playerId") || "";

    const connect = async () => {
      const response = await connectRoom(roomId, playerId);

      if (!response.success || !response.data) {
        setRoomIdErrorMessage("Game not found");
        setUsernames([]);
        setShowUsernameInput(false);
        setDisableUsernameInput(true);
        return;
      }

      const { playerName, playerNames } = response.data;

      setRoomIdErrorMessage("");
      setUsernames(playerNames);
      setShowUsernameInput(true);
      if (playerName.length === 0) {
        setUsername(localStorage.getItem("playerName") || "");
        setDisableUsernameInput(false);
      } else {
        setUsername(playerName);
        setDisableUsernameInput(true);
      }
    }

    connect();
  }, [roomId, setDisableUsernameInput, setRoomIdErrorMessage, setShowUsernameInput, setUsername, setUsernames]);
}

async function connectRoom(gameId: RoomId, playerId: PlayerId): Promise<EventResponse<ConnectRoomResponse>> {
  const response = await api.post(apiPaths.connectRoom(gameId), { playerId });
  return response.data;
}
