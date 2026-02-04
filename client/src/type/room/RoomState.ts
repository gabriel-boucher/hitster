import {Player} from "../player/Player.ts";
import {Playlist} from "../spotify/Playlist.ts";

export type RoomId = string;

export type RoomState = {
  roomId: RoomId;
  players: Player[];
  playlists: Playlist[];
}