import {Player} from "../player/Player.ts";
import {Playlist} from "../music/Playlist.ts";
import {MusicPlayerType} from "../music/MusicPlayerType.ts";

export type RoomId = string;

export type RoomState = {
  gameId: RoomId;
  players: Player[];
  playlists: Playlist[];
  musicPlayerType: MusicPlayerType;
}