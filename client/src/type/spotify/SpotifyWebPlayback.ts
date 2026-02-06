// Spotify Web Playback SDK Type Definitions

export interface WebPlaybackPlayer {
  device_id: string;
}

export interface WebPlaybackError {
  message: string;
}

export interface WebPlaybackTrack {
  uri: string;          // Spotify URI
  id: string;           // Spotify ID from URI (can be null)
  type: string;         // Content type: can be "track", "episode" or "ad"
  media_type: string;   // Type of file: can be "audio" or "video"
  name: string;         // Name of content
  is_playable: boolean; // Flag indicating whether it can be played
  album: {
    uri: string;        // Spotify Album URI
    name: string;
    images: { url: string }[];
  };
  artists: { uri: string; name: string }[];
}

export interface WebPlaybackPlayerState {
  context: {
    uri: string;       // The URI of the context (can be null)
    metadata: object;  // Additional metadata for the context (can be null)
  };
  disallows: {              // A simplified set of restriction controls for
    pausing: boolean;       // The current track. By default, these fields
    peeking_next: boolean;  // will either be set to false or undefined, which
    peeking_prev: boolean;  // indicates that the particular operation is
    resuming: boolean;      // allowed. When the field is set to `true`, this
    seeking: boolean;       // means that the operation is not permitted. For
    skipping_next: boolean; // example, `skipping_next`, `skipping_prev` and
    skipping_prev: boolean; // `seeking` will be set to `true` when playing an ad track.
  };
  paused: boolean;     // Whether the current track is paused.
  position: number;    // The position_ms of the current track.
  duration: number;    // The duration_ms of the current track.
  repeat_mode: number; // The repeat mode. No repeat mode is 0, repeat context is 1 and repeat track is 2.
  shuffle: boolean;    // True if shuffled, false otherwise.
  track_window: {
    current_track: WebPlaybackTrack;     // The track currently on local playback
    previous_tracks: WebPlaybackTrack[]; // Previously played tracks. Number can vary.
    next_tracks: WebPlaybackTrack[];     // Tracks queued next. Number can vary.
  };
}

export interface SpotifyPlayer {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: {
    (event: 'ready', callback: (connection: WebPlaybackPlayer) => void): boolean;
    (event: 'not_ready', callback: (connection: WebPlaybackPlayer) => void): boolean;
    (event: 'player_state_changed', callback: (state: WebPlaybackPlayerState) => void): boolean;
    (event: 'autoplay_failed', callback: () => void): boolean;
  };
  removeListener: (event: string, callback: (...args: unknown[]) => void) => boolean;
  on: {
    (event: 'initialization_error', callback: (error: WebPlaybackError) => void): boolean;
    (event: 'authentication_error', callback: (error: WebPlaybackError) => void): boolean;
    (event: 'account_error', callback: (error: WebPlaybackError) => void): boolean;
    (event: 'playback_error', callback: (error: WebPlaybackError) => void): boolean;
  };
  getCurrentState: () => Promise<WebPlaybackPlayerState | null>;
  setName: (name: string) => Promise<void>;
  getVolume: () => Promise<number>;
  setVolume: (volume: number) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  togglePlay: () => Promise<void>;
  seek: (position_ms: number) => Promise<void>;
  previousTrack: () => Promise<void>;
  nextTrack: () => Promise<void>;
  activateElement: () => Promise<void>;
}

export interface SpotifyPlayerConstructor {
  new (options: {
    name: string;
    getOAuthToken: (callback: (token: string) => void) => void;
    volume?: number;
  }): SpotifyPlayer;
}

declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady?: () => void;
    Spotify?: {
      Player: SpotifyPlayerConstructor;
    };
  }
}
