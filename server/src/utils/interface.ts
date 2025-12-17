import { Request } from "express";

export interface RoomRequest extends Request {
  roomId: string;
  accessToken: string;
}