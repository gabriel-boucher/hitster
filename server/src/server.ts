import http from "http";
import { Server } from "socket.io";
import { GameInterface } from "../../shared/Interfaces";
import { socketEvents } from "../../shared/Constants";
import useSocketHandler from "./SocketHandler";
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, './environments/.env') });

const server = http.createServer();
const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = parseInt(process.env.SERVER_PORT || "3000");

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const rooms: Record<string, GameInterface> = {};
const { createRoom, joinRoom, startGame, updateGameState, nextTurn, disconnect } = useSocketHandler(io, rooms);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on(socketEvents.CREATE_ROOM, createRoom);
  socket.on(socketEvents.JOIN_ROOM, joinRoom);
  socket.on(socketEvents.START_GAME, startGame);
  socket.on(socketEvents.UPDATE_GAME_STATE, updateGameState);
  socket.on(socketEvents.NEXT_TURN, nextTurn);
  socket.on("disconnect", disconnect);
});

/* Items
Start: items = [tokens, stackCards, playerCards]
       activeCard = stackCards.at(-1)
 */