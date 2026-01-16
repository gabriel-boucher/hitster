import {Dispatch} from "react";
import {RoomAction} from "./RoomAction.ts";

export const roomInitialState = {
  players: [],
  playlists: []
};

export const roomDefaultDispatch: Dispatch<RoomAction> = () => {};
