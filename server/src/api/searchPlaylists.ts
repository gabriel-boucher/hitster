interface PlaylistsResponse {
    playlists: {
        items: Array<{
            name: string;
        }>;
    };
}

export const searchPlaylists = async (accessToken: string): Promise<Array<string>> => {
    const response = await fetch("https://api.spotify.com/v1/search?q=avicii&type=playlist", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to search playlists: ${response.status}`);
    }

    const data = await response.json() as PlaylistsResponse;

    return data.playlists.items.map((item) => item?.name);
  };