import http from "http";
import { Server } from "socket.io";
import { GameInterface } from "../../Interfaces";
import { socketEvents } from "../../Constants";
import useSocketHandler from "./SocketHandler";

const server = http.createServer();
const IP = '0.0.0.0';
const PORT = 3000;

server.listen(PORT, IP, () => {
  console.log(`Server listening on http://${IP}:${PORT}`);
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
