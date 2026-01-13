import axios from "axios";
import { ConnectionType, getBaseUrl } from "src/utils/constants";
import { errorHandler } from "./errorHandler";

export default async function getPlaylistItems(roomId: string, playlistId: string, offset?: number) {
  try {
    const response = await axios.get(
      `${getBaseUrl(ConnectionType.HTTP_SERVER)}/api/getPlaylist/${playlistId}`,
      {
        params: { offset },
        headers: {
          "x-room-id": roomId,
        },
      }
    );

    return response.data;
  } catch (error) {
    return errorHandler(error);
  }
}