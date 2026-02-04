import {io} from "socket.io-client";
import {ConnectionType, getBaseUrl} from "../../utils/constants.ts";
import {Dispatch} from "react";
import {ConnectionAction} from "./ConnectionAction.ts";

const socket = io(getBaseUrl(ConnectionType.WS_SERVER));

export const connectionInitialState = {
  socket,
  roomId: "",
  playerId: ""
};

export const connectionDefaultDispatch: Dispatch<ConnectionAction> = () => {};
