import {Player} from "../../type/player/Player.ts";
import {Playlist} from "../../type/music/Playlist.ts";
import {MusicPlayerType} from "../../type/music/MusicPlayerType.ts";

export interface RoomState {
  players: Player[];
  playlists: Playlist[];
  musicPlayerType: MusicPlayerType;
}