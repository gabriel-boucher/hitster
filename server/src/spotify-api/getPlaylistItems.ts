import { TrackInterface } from "../../../shared/interfaces";

export interface GetPlaylistItemsResponse {
    items: Array<{ track: TrackInterface }>;
    total: number;
}

export const getPlaylistItems = async (accessToken: string, playlistId: string, offset: number): Promise<GetPlaylistItemsResponse> => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get playlist items: ${response.status}`);
    }

    const data = await response.json() as GetPlaylistItemsResponse;

    return data;
  };