import { Server, Socket } from "socket.io";
import {
  GameInterface,
} from "../../../shared/Interfaces";
import {
  socketEvents,
} from "../../../shared/Constants";

export default function useUpdateGameState(
  io: Server,
  rooms: Record<string, GameInterface>
) {
  return function updateGameState(this: Socket, game: GameInterface) {
    const socket = this;
    const roomId = socket.data.roomId;

    if (!roomId || !rooms[roomId]) return;

    rooms[roomId] = game;
    io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
  }
}
