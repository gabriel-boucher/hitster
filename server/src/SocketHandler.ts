import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import {
  GameInterface,
  PlayerInterface,
  CardInterface,
  TokenInterface,
} from "../../Interfaces";
import { gameStates, socketEvents, initialGameState } from "../../Constants";
import { isCard } from "../../utils";
import { cardsFetched, errorMessages } from "./Constants";
import useGameRules from "./GameRules";

export default function useSocketHandler(
  io: Server,
  rooms: Record<string, GameInterface>
) {
  function createRoom(callback: (roomId: string) => void) {
    const roomId = uuidv4();
    rooms[roomId] = structuredClone(initialGameState);
    callback(roomId);
  }

  function joinRoom(
    this: Socket,
    roomId: string,
    playerName: string,
    callback: (error: string) => void
  ) {
    const socket = this;

    const game = rooms[roomId];
    if (!game) {
      callback(errorMessages.ROOM_NOT_FOUND);
      return;
    } else if (game.players.some((player) => player.name === playerName)) {
      callback(errorMessages.NAME_ALREADY_TAKEN);
      return;
    } else {
      socket.join(roomId);
      socket.data.roomId = roomId;

      game.players.push({ socketId: socket.id, name: playerName });

      if (game.gameState === gameStates.PLAYING) {
        // Assign a starting card to new player
        game.items.findLast(
          (item) => !item.playerId && item.id !== game.activeCard.id
        )!.playerId = socket.id;

        // Adds two tokens assigned the new players
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
      callback("");
    }
  }

  function startGame(this: Socket) {
    const socket = this;
    const roomId = socket.data.roomId;

    let game = rooms[roomId];
    const cards: CardInterface[] = cardsFetched.map((card, index, arr) => ({
      ...card,
      id: uuidv4(),
      playerId:
        index >= arr.length - game.players.length
          ? game.players[arr.length - 1 - index].socketId
          : null,
    }));

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
      activePlayer: game.players[0],
      items: [...tokens, ...cards],
      activeCard: cards.filter((card) => card.playerId === null).at(-1)!,
    };

    rooms[roomId] = game;
    io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
  }

  function updateGameState(this: Socket, game: GameInterface) {
    const socket = this;
    const roomId = socket.data.roomId;

    if (!roomId || !rooms[roomId]) return;

    rooms[roomId] = game;
    io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
  }

  function nextTurn(this: Socket, game: GameInterface) {
    const socket = this;
    const roomId = socket.data.roomId;

    game = useGameRules(game).nextTurn();

    rooms[roomId] = game;
    io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
  }

  function disconnect(this: Socket) {
    const socket = this;
    console.log(`User Disconnected: ${socket.id}`);
    const roomId = socket.data.roomId;

    if (!roomId || !rooms[roomId]) return;

    const game = rooms[roomId];

    if (game.gameState === gameStates.PLAYING) {
      if (game.activePlayer.socketId === socket.id) {
        const activePlayerIndex = game.players.findIndex(
          (player) => player.socketId === socket.id
        );
        game.activePlayer =
          game.players[(activePlayerIndex + 1) % game.players.length];
      }

      game.items = game.items.filter((item) => item.playerId !== socket.id);

      game.activeCard = game.items.findLast(
        (item): item is CardInterface => isCard(item) && item.playerId === null
      )!;
    }

    game.players = game.players.filter(
      (player) => player.socketId !== socket.id
    );

    rooms[roomId] = game;
    io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
  }

  return { createRoom, joinRoom, startGame, updateGameState, nextTurn, disconnect };
}
