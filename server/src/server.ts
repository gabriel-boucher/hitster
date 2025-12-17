import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "./environments/.env") });

import http from "http";
import express from "express";
import cors from "cors";
import { Server, Socket } from "socket.io";
import { GameInterface } from "../../shared/interfaces";
import { HOST, SERVER_PORT } from "./utils/constants";
import { registerRoutes } from "./api/routes";
import { registerSockets } from "./sockets/sockets";

export const codeToToken: Record<string, string> = {};
export const rooms: Record<string, GameInterface> = {};

// App
const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:8000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "x-room-id"],
  }),
  express.json(),
);

app.use("/api", registerRoutes());

// Server
const server = http.createServer(app);

server.listen(SERVER_PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${SERVER_PORT}`);
});

// Socket Io
export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log(`User Connected: ${socket.id}`);
  registerSockets(socket);
});
