import { PlaylistInterface } from "../../../shared/interfaces";

interface PlaylistsResponse {
  playlists: {
    items: PlaylistInterface[];
  };
}

export const searchPlaylists = async (accessToken: string, searchQuery: string): Promise<PlaylistInterface[]> => {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=playlist`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to search playlists: ${response.status}`);
    }

    const data = await response.json() as {
      playlists: {
        items: Array<{
          id: string;
          name: string;
          images: Array<{ url: string }>;
        }>;
      };
    };

    return data.playlists.items.filter((playlist) => playlist);
  };