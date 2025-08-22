import { Socket } from "socket.io";
import {
  GameInterface,
} from "../../../shared/interfaces";
import {
  socketEvents,
} from "../../../shared/constants";
import useGameRules from "../gameRules";
import { io, rooms } from "../server";

export default function nextTurn(this: Socket, game: GameInterface) {
  const socket = this;
  const roomId = socket.data.roomId;

  if (!roomId || !rooms[roomId]) return;

  const { nextTurn } = useGameRules(game);
  game = nextTurn();

  rooms[roomId] = game;
  io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
}
