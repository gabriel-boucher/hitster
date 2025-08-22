import { Socket } from "socket.io";
import { PlayerInterface } from "../../../shared/interfaces";
import {
  gameStates,
  initialGameState,
  PLAYERS_IMG,
  socketEvents,
} from "../../../shared/constants";
import { v4 as uuidv4 } from "uuid";
import { isCard } from "../../../shared/utils";
import { getAccessToken } from "../api/getAccessToken";
import { codeToToken, io, rooms } from "../server";


export default async function joinRoom(this: Socket, roomId: string) {
  const socket = this;

  if (!rooms[roomId]) {
    rooms[roomId] = structuredClone(initialGameState);
    codeToToken[roomId] = await getAccessToken(roomId);;
  }

  const game = rooms[roomId];
  if (game.players.find((player) => player.socketId === socket.id)) {
    return;
  }

  socket.join(roomId);
  socket.data.roomId = roomId;

  if (game.players.length === 0) {
    game.players.push({
      socketId: socket.id,
      name: "",
      active: true,
      image: PLAYERS_IMG.filter(
        (image: string) =>
          !game.players.some(
            (player: PlayerInterface) => player.image === image
          )
      )[0],
    });
  } else {
    game.players.push({
      socketId: socket.id,
      name: "",
      active: false,
      image: PLAYERS_IMG.filter(
        (image: string) =>
          !game.players.some(
            (player: PlayerInterface) => player.image === image
          )
      )[0],
    });
  }

  if (game.gameState === gameStates.PLAYING) {
    // Assign a starting card to the new player
    game.items.findLast(
      (item) => isCard(item) && !item.playerId && !item.active
    )!.playerId = socket.id;

    // Assigns two tokens to the new player
    Array.from({ length: 2 }).forEach(() => {
      game.items.unshift({
        id: uuidv4(),
        active: false,
        activePlayerId: null,
        playerId: socket.id,
      });
    });
  }

  io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
};
