import axios from "axios";
import { ConnectionType, getBaseUrl } from "src/utils/constants";

export default async function searchPlaylists(roomId: string, query: string) {
  try {
    const response = await axios.post(`${getBaseUrl(ConnectionType.SERVER)}/api/searchPlaylists`, {
      roomId,
      query,
    });

    return response.data.playlists;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }

    return [];
  }
}
