import axios from "axios";
import { ConnectionType, getBaseUrl } from "src/utils/constants";
import { errorHandler } from "./errorHandler";

export default async function getPlaylist(roomId: string, playlistId: string) {
  try {
    const response = await axios.get(
      `${getBaseUrl(ConnectionType.HTTP_SERVER)}/api/getPlaylist/${playlistId}`,
      {
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