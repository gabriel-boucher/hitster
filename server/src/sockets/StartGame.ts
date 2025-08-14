import { Server, Socket } from "socket.io";
import {
  CardInterface,
  GameInterface,
  TokenInterface,
} from "../../../shared/Interfaces";
import {
  gameStates,
  socketEvents,
} from "../../../shared/Constants";
import { v4 as uuidv4 } from "uuid";
import { isCard } from "../../../shared/utils";
import { cardsFetched } from "../Constants";

export default function useStartGame(
  io: Server,
  rooms: Record<string, GameInterface>
) {
  return function startGame(this: Socket) {
    const socket = this;
    const roomId = socket.data.roomId;

    let game = rooms[roomId];
    const cards: CardInterface[] = cardsFetched.map((card, index, arr) => ({
      ...card,
      id: uuidv4(),
      active: false,
      playerId:
        index >= arr.length - game.players.length
          ? game.players[arr.length - 1 - index].socketId
          : null,
    }));

    cards.findLast(
      (item): item is CardInterface => isCard(item) && item.playerId === null
    )!.active = true;

    const tokens: TokenInterface[] = game.players.flatMap((player) =>
      Array.from({ length: 2 }, () => ({
        id: uuidv4(),
        active: false,
        activePlayerId: null,
        playerId: player.socketId,
      }))
    );

    game = {
      ...game,
      gameState: gameStates.PLAYING,
      items: [...tokens, ...cards],
    };

    rooms[roomId] = game;
    io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
  };
}
