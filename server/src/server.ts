import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, './environments/.env') });

import http from "http";
import { Server } from "socket.io";
import { GameInterface } from "../../shared/Interfaces";
import { socketEvents } from "../../shared/Constants";
import useUpdateGameState from "./sockets/UpdateGameState";
import { HOST, SERVER_PORT } from "./Constants";
import useJoinRoom from './sockets/JoinRoom';
import useStartGame from './sockets/StartGame';
import useNextTurn from './sockets/NextTurn';
import useDisconnect from './sockets/Disconnect';

const server = http.createServer();

server.listen(SERVER_PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${SERVER_PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const codeToToken: Record<string, string> = {};
const rooms: Record<string, GameInterface> = {};
const joinRoom = useJoinRoom(io, rooms, codeToToken);
const startGame = useStartGame(io, rooms);
const updateGameState = useUpdateGameState(io, rooms);
const nextTurn = useNextTurn(io, rooms);
const disconnect = useDisconnect(io, rooms);

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

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