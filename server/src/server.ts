import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import { cardsFetched } from "./Constants";
import { GameInterface, gameStates, PlayerInterface, CardInterface, TokenInterface } from "../../Interfaces";

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

const rooms: Record<string, GameInterface> = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("createRoom", (_, callback) => {
    const roomId = uuidv4();
    rooms[roomId] = {
      gameState: gameStates.LOBBY,
      players: [],
      activePlayer: {} as PlayerInterface,
      items: [],
      activeCard: {} as CardInterface,
    };
    callback(roomId);
  });

  socket.on("joinRoom", (roomId: string, playerName: string, callback) => {
    if (!rooms[roomId]) {
      io.to(socket.id).emit("room-error", "Room does not exist");
    } else {
      if (rooms[roomId].players.find((player) => player.name === playerName)) {
        callback("Name already taken");
      } else {
        socket.join(roomId);
        socket.data.roomId = roomId;
        rooms[roomId].players.push({ socketId: socket.id, name: playerName });
        io.to(roomId).emit("updateGameState", rooms[roomId]);
        callback("")
      }
    }
  });

  socket.on("startGame", () => {
    const roomId = socket.data.roomId;
    let game = rooms[roomId];
    const cards: CardInterface[] = cardsFetched.map((card) => ({
      ...card,
      id: uuidv4(),
      playerId: null,
    }));
    game.players.forEach((player, index) => {
      cards[cards.length - 1 - index].playerId = player.socketId;
    });

    const tokens: TokenInterface[] = [];
    game.players.forEach((player) => {
      tokens.push({
        id: uuidv4(),
        active: false,
        activePlayerId: null,
        playerId: player.socketId,
      });
      tokens.push({
        id: uuidv4(),
        active: false,
        activePlayerId: null,
        playerId: player.socketId,
      });
    });

    const gameState = gameStates.PLAYING;
    const activePlayer = game.players[0];
    const items = [...tokens, ...cards];
    const activeCard = cards.filter((card) => card.playerId === null).at(-1)!;

    game = {
      ...game,
      gameState,
      activePlayer,
      items,
      activeCard,
    };

    rooms[roomId] = game;

    io.to(roomId).emit("updateGameState", game);
  });

  socket.on("updateGameState", (game: GameInterface) => {
    const roomId = socket.data.roomId;
    if (!roomId || !rooms[roomId]) return;
    rooms[roomId] = game;
    io.to(roomId).emit("updateGameState", game);
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);

    const roomId = socket.data.roomId;
    if (!roomId || !rooms[roomId]) return;

    let game = rooms[roomId];

    if (game.items.length === 0) {
      game.players = game.players.filter(
        (player) => player.socketId !== socket.id
      );
    } else {
      let activePlayer = game.activePlayer;
      if (game.activePlayer.socketId === socket.id) {
        const activePlayerIndex = game.players.findIndex(
          (player) => player.socketId === socket.id
        );

        activePlayer =
          game.players[(activePlayerIndex + 1) % game.players.length];
      }

      const players = game.players.filter(
        (player) => player.socketId !== socket.id
      );

      const items = game.items.filter(
        (item) => item.playerId !== socket.id
      );

      const activeCard = items
        .filter((item) => "song" in item)
        .filter((card) => card.playerId === null)
        .at(-1)!;

      game = {
        ...game,
        players,
        activePlayer,
        items,
        activeCard,
      };
    }

    rooms[roomId] = game;

    io.to(roomId).emit("updateGameState", game);
  });
});
