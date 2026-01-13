export type PlaylistId = string;

export type Playlist = {
  id: PlaylistId;
  name: string;
  imageUrl: string;
  totalTracks: number;
};