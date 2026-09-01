import { RoomId } from "../type/room/RoomState.ts";
import { PlayerId } from "../type/player/Player.ts";
import { PlaylistId } from "../type/music/Playlist.ts";

export const apiPaths = {
  createRoom: () => "/api/games/new/create",
  connectRoom: (gameId: RoomId) => `/api/games/${gameId}/connect`,
  joinGame: (gameId: RoomId) => `/api/games/${gameId}/join`,
  startGame: (gameId: RoomId) => `/api/games/${gameId}/start`,
  changePlayerName: (gameId: RoomId, playerName: string) =>
    `/api/games/${gameId}/player/me?name=${encodeURIComponent(playerName)}`,
  changePlayerColor: (gameId: RoomId, playerColor: string) =>
    `/api/games/${gameId}/player/me?color=${encodeURIComponent(playerColor)}`,
  removePlayer: (gameId: RoomId, playerToRemoveId: PlayerId) =>
    `/api/games/${gameId}/player/${playerToRemoveId}`,
  nextTurn: (gameId: RoomId) => `/api/games/${gameId}/turn`,
  cardMovement: (gameId: RoomId, movement: string) =>
    `/api/games/${gameId}/movements/cards/${movement}`,
  tokenMovement: (gameId: RoomId, movement: string) =>
    `/api/games/${gameId}/movements/tokens/${movement}`,
  addPlaylist: (gameId: RoomId) => `/api/games/${gameId}/playlists/`,
  removePlaylist: (gameId: RoomId, playlistId: PlaylistId) =>
    `/api/games/${gameId}/playlists/${playlistId}`,
  searchPlaylists: (gameId: RoomId) => `/api/games/${gameId}/music/`,
  musicAuth: (gameId: RoomId, authType: string) =>
    `/api/games/${gameId}/music/auth/${authType}`,
};
