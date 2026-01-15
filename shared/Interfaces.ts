import {Player} from "../client/src/type/player/Player";
import {Playlist} from "../client/src/type/spotify/Playlist";
import {GameStatus} from "../client/src/type/game/GameState";
import {Card} from "../client/src/type/item/Card";
import {Token} from "../client/src/type/item/Token";

export interface PlayerInterface {
  socketId: string;
  name: string;
  active: boolean;
  image: string;
}

export interface CardInterface {
  id: string;
  song: string;
  artist: string;
  date: string;
  albumCover: string;
  active: boolean;
  playerId: string | null;
}

export interface TokenInterface {
  id: string;
  active: boolean;
  activePlayerId: string | null;
  playerId: string;
}

export interface GameInterface {
  gameStatus: GameStatus;
  players: Player[];
  items: (Card | Token)[];
  playlists: Playlist[],
}

export interface PlaylistInterface {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  tracks: { items: Array<{ track: TrackInterface }>, total: number };
}

export interface TrackInterface {
  id: string;
  name: string;
  album: { images: Array<{ url: string }>, release_date: string };
  artists: Array<{ name: string }>;
}