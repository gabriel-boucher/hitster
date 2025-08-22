import { Server, Socket } from "socket.io";
import { GameInterface } from "../../../shared/interfaces";
import { socketEvents } from "../../../shared/constants";
import { io, rooms } from "../server";

export default function updateGameState(this: Socket, game: GameInterface) {
  const socket = this;
  const roomId = socket.data.roomId;

  if (!roomId || !rooms[roomId]) return;

  rooms[roomId] = game;
  io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
}
