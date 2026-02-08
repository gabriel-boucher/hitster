import {useCallback, useEffect, useState} from 'react';
import useGetAccessToken from '../http/spotify/useGetAccessToken';
import type {WebPlaybackPlayer} from 'src/type/spotify/SpotifyWebPlayback';
import {usePlaybackStateProvider} from "../../stateProvider/spotify/SpotifyStateProvider.tsx";
import {playbackReducerCases} from "../../stateProvider/spotify/PlaybackReducerCases.ts";

export function useSpotifyPlayer() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [{ spotifyPlayer, isPlaying }, dispatchSpotifyState] = usePlaybackStateProvider();

  const getAccessToken = useGetAccessToken();

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getAccessToken();
      setAccessToken(token);
    };

    fetchToken();
  }, [getAccessToken]);

  const handleReady = useCallback(async ({ device_id }: WebPlaybackPlayer) => {
    if (!device_id) return;

    await transferPlaybackToDevice(device_id, accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) return;
    if (spotifyPlayer) return;

    const initializePlayer = () => {
      if (!window.Spotify) return;

      const newSpotifyPlayer = new window.Spotify.Player({
        name: 'Hitster Web Player',
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      newSpotifyPlayer.addListener('ready', handleReady);

      newSpotifyPlayer.connect();

      dispatchSpotifyState({ type: playbackReducerCases.SET_SPOTIFY_PLAYER, spotifyPlayer: newSpotifyPlayer });
    };

    const loadSpotifySDK = () => {
      if (window.Spotify) {
        initializePlayer();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://sdk.scdn.co/spotify-player.js';
      script.async = true;
      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = initializePlayer;
    };

    loadSpotifySDK();
  }, [spotifyPlayer, accessToken, handleReady, dispatchSpotifyState]);

  useEffect(() => {
    if (!spotifyPlayer || !isPlaying) return;

    const intervalId = setInterval(async () => {
      const state = await spotifyPlayer.getCurrentState();
      if (state && !state.paused) {
        dispatchSpotifyState({ type: playbackReducerCases.SET_TIME_POSITION, timePosition: state.position });
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [spotifyPlayer, isPlaying, dispatchSpotifyState]);
}

async function transferPlaybackToDevice(
  deviceId: string,
  accessToken: string | null
): Promise<void> {
  if (!accessToken) return;

  const response = await fetch('https://api.spotify.com/v1/me/player', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      device_ids: [deviceId],
      play: true,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to transfer playback: ${response.statusText}`);
  }
}
