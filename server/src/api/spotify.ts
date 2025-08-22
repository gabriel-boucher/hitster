import { PlaylistInterface } from "../../../shared/interfaces";
import { getAccessToken } from "./getAccessToken";
import { searchPlaylists } from "./searchPlaylists";

interface Api {
    getAccessToken: (code: string) => Promise<string>;
    searchPlaylists: (accessToken: string, searchQuery: string) => Promise<PlaylistInterface[]>;
}

const spotify: Api = {
    getAccessToken,
    searchPlaylists
}

export default spotify