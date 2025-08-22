import { Router, Request, Response } from "express";
import spotify from "../api/spotify";
import { codeToToken } from "../server";

const router = Router();

router.post("/searchPlaylists", async (req: Request, res: Response) => {
    try {
        const { roomId, query } = req.body;
    
        if (!roomId || !query) {
          return res.status(400).json({ error: "Missing roomCode or query" });
        }
    
        const accessToken = codeToToken[roomId];
    
        const playlists = await spotify.searchPlaylists(accessToken, query);
        res.json({ playlists });
      } catch (err: any) {
        console.error("Error in /api/searchPlaylists:", err.message);
        res.status(500).json({ error: err.message });
      }
});

export default router