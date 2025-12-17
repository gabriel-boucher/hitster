import { getAccessToken } from "./getAccessToken";
import { searchPlaylists, SearchPlaylistsResponse } from "./searchPlaylists";
import { getPlaylist, GetPlaylistResponse } from "./getPlaylist";
import { getPlaylistItems, GetPlaylistItemsResponse } from "./getPlaylistItems";

interface Api {
    getAccessToken: (code: string) => Promise<string>;
    searchPlaylists: (accessToken: string, searchQuery: string) => Promise<SearchPlaylistsResponse>;
    getPlaylist: (accessToken: string, playlistId: string) => Promise<GetPlaylistResponse>;
    getPlaylistItems: (accessToken: string, playlistId: string, offset: number) => Promise<GetPlaylistItemsResponse>;
}

const spotify: Api = {
    getAccessToken,
    searchPlaylists,
    getPlaylist,
    getPlaylistItems
}

export default spotify