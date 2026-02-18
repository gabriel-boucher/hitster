import {roomReducerCases} from "./RoomReducerCases.ts";
import {Player} from "../../type/player/Player.ts";
import {Playlist} from "../../type/music/Playlist.ts";
import {MusicPlayerType} from "../../type/music/MusicPlayerType.ts";

export interface SetPlayersRoomAction {
  type: roomReducerCases.SET_PLAYERS;
  players: Player[];
}

export interface SetPlaylistsRoomAction {
  type: roomReducerCases.SET_PLAYLISTS;
  playlists: Playlist[];
}

export interface SetMusicPlayerTypeRoomAction {
  type: roomReducerCases.SET_MUSIC_PLAYER_TYPE;
  musicPlayerType: MusicPlayerType;
}

export type RoomAction =
  | SetPlayersRoomAction
  | SetPlaylistsRoomAction
  | SetMusicPlayerTypeRoomAction;
