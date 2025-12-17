import { Socket } from "socket.io";
import { socketEvents } from "../../../../shared/constants";
import joinRoom from "./joinRoom";
import startGame from "./startGame";
import updateGameState from "./updateGameState";
import nextTurn from "./nextTurn";
import { disconnect } from "process";

export const registerSockets = (socket: Socket) => {
  socket.on(socketEvents.JOIN_ROOM, joinRoom);
  socket.on(socketEvents.START_GAME, startGame);
  socket.on(socketEvents.UPDATE_GAME_STATE, updateGameState);
  socket.on(socketEvents.NEXT_TURN, nextTurn);
  socket.on(socketEvents.DISCONNECT, disconnect);
};
