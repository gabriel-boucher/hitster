import {Dispatch} from "react";
import {RoomAction} from "./RoomAction.ts";
import {MusicPlayerType} from "../../type/music/MusicPlayerType.ts";

export const roomInitialState = {
  players: [],
  playlists: [],
  musicPlayerType: MusicPlayerType.IN_MEMORY
};

export const roomDefaultDispatch: Dispatch<RoomAction> = () => {};
