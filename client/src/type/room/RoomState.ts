import {Player} from "../player/Player.ts";
import {Playlist} from "../music/Playlist.ts";
import {MusicPlayerType} from "../music/MusicPlayerType.ts";
import {GameStatus} from "../game/GameState.ts";

export type RoomId = string;

export type RoomState = {
  gameId: RoomId;
  gameStatus: GameStatus;
  players: Player[];
  playlists: Playlist[];
  musicPlayerType: MusicPlayerType;
}