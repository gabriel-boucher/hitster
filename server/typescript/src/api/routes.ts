import { Router, Request, Response } from "express";
import searchPlaylists from "./searchPlaylists";
import getPlaylist from "./getPlaylist";
import getPlaylistItems from "./getPlaylistItems";

export const registerRoutes = () => {
    const router = Router();
    router.use(searchPlaylists);
    router.use(getPlaylist)
    router.use(getPlaylistItems)

    return router;
}