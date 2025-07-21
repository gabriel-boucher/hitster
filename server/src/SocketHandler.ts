import { Server, Socket } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import {GameInterface, CardInterface, TokenInterface, PlayerInterface} from "../../shared/Interfaces";
import { gameStates, socketEvents, initialGameState } from "../../shared/Constants";
import { getActivePlayerId, isCard, isToken } from "../../shared/utils";
import { cardsFetched, errorMessages } from "./Constants";
import useGameRules from "./GameRules";

export default function useSocketHandler(
  io: Server,
  rooms: Record<string, GameInterface>
) {
  function joinRoom(
    this: Socket,
    roomId: string,
  ) {
    const socket = this;
    
    if(!rooms[roomId]) {
      rooms[roomId] = structuredClone(initialGameState);
    }

    const game = rooms[roomId];
    if (game.players.find((player) => player.socketId === socket.id)) {
      return;
    }
    
    socket.join(roomId);
    socket.data.roomId = roomId;

    if (game.players.length === 0) {
      game.players.push({ socketId: socket.id, name: "", active: true, image: "red" });
    } else {
      game.players.push({ socketId: socket.id, name: "", active: false, image: "red" });
    }

    // if (game.gameState === gameStates.PLAYING) {
    //   // Assign a starting card to the new player
    //   game.items.findLast(
    //     (item) => isCard(item) && !item.playerId && !item.active
    //   )!.playerId = socket.id;

    //   // Assigns two tokens to the new player
    //   Array.from({ length: 2 }).forEach(() => {
    //     game.items.unshift({
    //       id: uuidv4(),
    //       active: false,
    //       activePlayerId: null,
    //       playerId: socket.id,
    //     });
    //   });
    // }

    io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
  }

  function startGame(this: Socket) {
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
  }

  function updateGameState(this: Socket, game: GameInterface) {
    const socket = this;
    const roomId = socket.data.roomId;

    if (!roomId || !rooms[roomId]) return;

    rooms[roomId] = game;
    io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
    logItems(game.items);
  }

  function nextTurn(this: Socket, game: GameInterface) {
    const socket = this;
    const roomId = socket.data.roomId;

    if (!roomId || !rooms[roomId]) return;

    const { nextTurn } = useGameRules(game);
    game = nextTurn();

    rooms[roomId] = game;
    io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
  }

  function disconnect(this: Socket) {
    const socket = this;
    const roomId = socket.data.roomId;
    
    console.log(`User Disconnected: ${socket.id}`);
    
    if (!roomId || !rooms[roomId]) return;

    const game = rooms[roomId];

    if (game.gameState === gameStates.PLAYING) {
      if (socket.id === getActivePlayerId(game.players)) {
        const activePlayerIndex = game.players.findIndex(
          (player) => player.socketId === socket.id
        );
        game.players[(activePlayerIndex + 1) % game.players.length].active = true;
      }

      game.items = game.items.filter((item) => item.playerId !== socket.id);

      game.items.findLast(
        (item): item is CardInterface => isCard(item) && item.playerId === null
      )!.active = true;
    }

    game.players = game.players.filter(
      (player) => player.socketId !== socket.id
    );

    rooms[roomId] = game;
    io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
  }

  function logItems(items: (CardInterface | TokenInterface)[]) {
    items.forEach((item) => {
      if (isToken(item)) {
        console.log(`Token ${item.id} - Player ${item.playerId} - Active: ${item.active} - ActivePlayerId: ${item.activePlayerId}`);
      } else {
        console.log(`Card ${item.id} - Player ${item.playerId}`);
      }
    });
    console.log("")
  }

  return {
    joinRoom,
    startGame,
    updateGameState,
    nextTurn,
    disconnect,
  };
}
