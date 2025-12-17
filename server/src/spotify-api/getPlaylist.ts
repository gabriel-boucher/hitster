import { PlaylistInterface } from "../../../shared/interfaces";

export interface GetPlaylistResponse extends PlaylistInterface { }

export const getPlaylist = async (accessToken: string, playlistId: string): Promise<GetPlaylistResponse> => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get playlist: ${response.status}`);
    }

    const data = await response.json() as GetPlaylistResponse;

    return data;
  };