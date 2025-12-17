import { Router, Request, Response } from "express";
import spotify from "../spotify-api/spotify";
import { withRoom } from "./middlewares";
import { RoomRequest } from "../utils/interface";
import { errorHandler } from "./errorHandler";

const router = Router();

router.get("/getPlaylist/:playlistId/tracks", withRoom, async (req: Request, res: Response) => {
  try {
    const { playlistId, offset } = req.params;
    const accessToken = (req as RoomRequest).accessToken;

    if (!playlistId) {
      return res.status(400).json({ error: "Missing playlistId" });
    }

    const playlist = await spotify.getPlaylistItems(accessToken, playlistId, parseInt(offset));
    res.json({ playlist });
  } catch (err: any) {
    errorHandler(req, res, err);
  }
});

export default router;