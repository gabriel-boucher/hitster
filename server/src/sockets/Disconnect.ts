import { Server, Socket } from "socket.io";
import {
    CardInterface,
  GameInterface,
} from "../../../shared/Interfaces";
import {
    gameStates,
  socketEvents,
} from "../../../shared/Constants";
import { getActivePlayerId, isCard } from "../../../shared/utils";

export default function useDisconnect(
  io: Server,
  rooms: Record<string, GameInterface>
) {
  return function disconnect(this: Socket) {
    const socket = this;
    const roomId = socket.data.roomId;
    
    console.log(`User Disconnected: ${socket.id}`);
    
    if (!roomId || !rooms[roomId]) return;

    const game = rooms[roomId];

    if (game.gameState === gameStates.PLAYING) {
      // Set the next active player
      if (socket.id === getActivePlayerId(game.players)) {
        const activePlayerIndex = game.players.findIndex(
          (player) => player.socketId === socket.id
        );
        game.players[(activePlayerIndex + 1) % game.players.length].active = true;
      }

      // Remove the player's items
      game.items = game.items.filter((item) => item.playerId !== socket.id);

      // Set the next active card
      game.items.findLast(
        (item): item is CardInterface => isCard(item) && item.playerId === null
      )!.active = true;
    }

    // Remove the player
    game.players = game.players.filter(
      (player) => player.socketId !== socket.id
    );

    rooms[roomId] = game;
    io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
  }
}
