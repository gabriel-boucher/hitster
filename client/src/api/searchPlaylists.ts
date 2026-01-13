import axios from "axios";
import {getBaseUrl, ConnectionType} from "src/utils/constants";
import { errorHandler } from "./errorHandler";
import {RoomId} from "../type/room/RoomState.ts";
import {PlayerId} from "../type/player/Player.ts";
import {Playlist} from "../type/spotify/Playlist.ts";

export default async function searchPlaylists(roomId: RoomId, playerId: PlayerId, query: string): Promise<Playlist[]> {
  try {
    const response = await axios.get(
      `${getBaseUrl(ConnectionType.HTTP_SERVER)}/api/spotify/search-playlists`,
      {
        params: { query },
        headers: {
          "x-room-id": roomId,
          "x-player-id": playerId,
        },
      }
    );

    return response.data.playlists;
  } catch (error) {
    return errorHandler(error);
  }
}
