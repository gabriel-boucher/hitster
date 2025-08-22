import { Router, Request, Response } from "express";
import searchPlaylists from "./searchPlaylists";

export const registerRoutes = () => {
    const router = Router();
    router.use(searchPlaylists);

    return router;
}