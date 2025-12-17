import { PlaylistInterface } from "../../../shared/interfaces";

export interface SearchPlaylistsResponse {
  playlists: {
    items: PlaylistInterface[];
    total: number
  };
}

export const searchPlaylists = async (accessToken: string, searchQuery: string): Promise<SearchPlaylistsResponse> => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=playlist`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to search playlists: ${response.status}`);
    }

    const data =  await response.json() as SearchPlaylistsResponse;

    return data;
  };