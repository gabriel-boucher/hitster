import {io} from "socket.io-client";
import {Dispatch} from "react";
import {ConnectionAction} from "./ConnectionAction.ts";
import {WS_SERVER_URL} from "../../config/url.ts";

const socket = io(WS_SERVER_URL);

export const connectionInitialState = {
  socket,
  roomId: "",
  playerId: ""
};

export const connectionDefaultDispatch: Dispatch<ConnectionAction> = () => {};
