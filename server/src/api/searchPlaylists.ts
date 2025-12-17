import { Router, Request, Response } from "express";
import spotify from "../spotify-api/spotify";
import { withRoom } from "./middlewares";
import { RoomRequest } from "../utils/interface";
import { PlaylistInterface } from "../../../shared/interfaces";
import { errorHandler } from "./errorHandler";

const router = Router();

router.get("/searchPlaylists", withRoom, async (req: Request, res: Response) => {
  try {
    const { query } = req.query;
    const accessToken = (req as RoomRequest).accessToken;

    if (!query) {
      return res.status(400).json({ error: "Missing query" });
    }

    const search = await spotify.searchPlaylists(accessToken, query as string);
    const playlists = search.playlists.items.filter((playlist: PlaylistInterface) => playlist);
    res.json({ playlists });
  } catch (err: any) {
    errorHandler(req, res, err);
  }
});

export default router;