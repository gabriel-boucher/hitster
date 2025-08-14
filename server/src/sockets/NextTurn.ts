import { Server, Socket } from "socket.io";
import {
  GameInterface,
} from "../../../shared/Interfaces";
import {
  socketEvents,
} from "../../../shared/Constants";
import useGameRules from "../GameRules";

export default function useNextTurn(
  io: Server,
  rooms: Record<string, GameInterface>
) {
  return function nextTurn(this: Socket, game: GameInterface) {
    const socket = this;
    const roomId = socket.data.roomId;

    if (!roomId || !rooms[roomId]) return;

    const { nextTurn } = useGameRules(game);
    game = nextTurn();

    rooms[roomId] = game;
    io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
  }
}
