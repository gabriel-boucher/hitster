import { gameStates } from "./constants";
import {Player} from "../client/src/type/player/Player";
import {Playlist} from "../client/src/type/spotify/Playlist";

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
  gameState: gameStates;
  players: Player[];
  items: (CardInterface | TokenInterface)[];
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