import {Dispatch} from "react";
import {ConnectionAction} from "./ConnectionAction.ts";

export const connectionInitialState = {
  socket: undefined,
  roomId: "",
  playerId: ""
};

export const connectionDefaultDispatch: Dispatch<ConnectionAction> = () => {};
