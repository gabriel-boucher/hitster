import { Router, Request, Response, NextFunction } from "express";
import { codeToToken } from "../server";
import { RoomRequest } from "../utils/interface";

export const withRoom = (req: Request, res: Response, next: NextFunction ) => {
  const roomId = req.header("x-room-id");
  
  if (!roomId) {
    return res.status(400).json({ error: "Missing roomId" });
  }

  const accessToken = codeToToken[roomId];
  if (!accessToken) {
    return res.status(401).json({ error: "Invalid roomId" });
  }

  // attach values so routes can use them
  (req as RoomRequest).roomId = roomId;
  (req as RoomRequest).accessToken = accessToken;

  next();
};
