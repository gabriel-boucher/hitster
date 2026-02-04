import {roomReducerCases} from "./RoomReducerCases.ts";
import {Player} from "../../type/player/Player.ts";
import {Playlist} from "../../type/spotify/Playlist.ts";

export interface SetPlayersRoomAction {
  type: roomReducerCases.SET_PLAYERS;
  players: Player[];
}

export interface SetPlaylistsRoomAction {
  type: roomReducerCases.SET_PLAYLISTS;
  playlists: Playlist[];
}

export type RoomAction =
  | SetPlayersRoomAction
  | SetPlaylistsRoomAction
