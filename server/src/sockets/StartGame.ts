import { Socket } from "socket.io";
import {
  CardInterface,
  PlaylistInterface,
  TokenInterface,
  TrackInterface,
} from "../../../shared/interfaces";
import {
  gameStates,
  socketEvents,
} from "../../../shared/constants";
import { v4 as uuidv4 } from "uuid";
import { isCard } from "../../../shared/utils";
import { cardsFetched } from "../utils/constants";
import { io, rooms, codeToToken } from "../server";
import spotify from "../spotify-api/spotify";

export default async function startGame(this: Socket, selectedPlaylists: PlaylistInterface[]) {
  const socket = this;
  const roomId = socket.data.roomId;

  let game = rooms[roomId];

  let tracks : TrackInterface[] = [];

  for (let i = 0; i < selectedPlaylists.length; i++) {
    const playlist = selectedPlaylists[i];

    let offset = 0;
    while (playlist.tracks.total > offset) {
      const playlistResponse = await spotify.getPlaylistItems(codeToToken[roomId], playlist.id, offset);
      tracks.push(...playlistResponse.items.map((item) => item.track));
      offset += 100;
    }
  }

  const cards: CardInterface[] = shuffleTracks(tracks)
  .map((track, index, arr) => ({
    id: track.id,
    song: track.name,
    artist: track.artists[0].name,
    date: track.album.release_date?.substring(0, 4),
    albumCover: track.album.images[0]?.url,
    active: false,
    playerId:
      index >= arr.length - game.players.length
        ? game.players[arr.length - 1 - index].socketId
        : null,
    
  }))

  cards.findLast(
    (item): item is CardInterface => isCard(item) && item.playerId === null
  )!.active = true;

  const tokens: TokenInterface[] = game.players.flatMap((player) =>
    Array.from({ length: 2 }, () => ({
      id: uuidv4(),
      active: false,
      activePlayerId: null,
      playerId: player.socketId,
    }))
  );

  game = {
    ...game,
    gameState: gameStates.PLAYING,
    items: [...tokens, ...cards],
  };

  rooms[roomId] = game;
  io.to(roomId).emit(socketEvents.UPDATE_GAME_STATE, game);
};

function shuffleTracks(tracks: TrackInterface[]) {
  const arr = [...tracks]; // make a copy to avoid modifying the original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // pick a random index
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr;
}
