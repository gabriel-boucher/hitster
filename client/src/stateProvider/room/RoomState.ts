import {Player} from "../../type/player/Player.ts";
import {Playlist} from "../../type/spotify/Playlist.ts";

export interface RoomState {
  players: Player[];
  playlists: Playlist[];
}