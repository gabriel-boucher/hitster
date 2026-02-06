import {useCallback, useEffect, useState} from 'react';
import useGetAccessToken from '../http/spotify/useGetAccessToken';
import type {SpotifyPlayer, WebPlaybackPlayer, WebPlaybackPlayerState} from 'src/type/spotify/SpotifyWebPlayback';
import {useSpotifyStateProvider} from "../../stateProvider/spotify/SpotifyStateProvider.tsx";
import {spotifyReducerCases} from "../../stateProvider/spotify/SpotifyReducerCases.ts";

export function useSpotifyPlayer() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [{ spotifyPlayer, isPlaying }, dispatchSpotifyState] = useSpotifyStateProvider();

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

  const handlePlayerStateChanged = useCallback((state: WebPlaybackPlayerState) => {
    if (!state) return;

    dispatchSpotifyState({ type: spotifyReducerCases.SET_IS_PLAYING, isPlaying: !state.paused });
    dispatchSpotifyState({ type: spotifyReducerCases.SET_TIME_POSITION, timePosition: state.position });
    dispatchSpotifyState({ type: spotifyReducerCases.SET_DURATION, duration: state.duration || 0 });
    spotifyPlayer?.getVolume().then(volume => {
        dispatchSpotifyState({ type: spotifyReducerCases.SET_VOLUME, volume });
    });
  }, [spotifyPlayer, dispatchSpotifyState]);

  useEffect(() => {
    if (!accessToken) return;
    if (spotifyPlayer) return;

    const setupPlayerListeners = (spotifyPlayer: SpotifyPlayer) => {
      spotifyPlayer.addListener('ready', handleReady);
      spotifyPlayer.addListener('player_state_changed', handlePlayerStateChanged);
    };

    const initializePlayer = () => {
      if (!window.Spotify) return;

      const newSpotifyPlayer = new window.Spotify.Player({
        name: 'Hitster Web Player',
        getOAuthToken: (cb) => {
          cb(accessToken);
        },
        volume: 0.5,
      });

      setupPlayerListeners(newSpotifyPlayer);

      newSpotifyPlayer.connect();

      dispatchSpotifyState({ type: spotifyReducerCases.SET_SPOTIFY_PLAYER, spotifyPlayer: newSpotifyPlayer });
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
  }, [spotifyPlayer, accessToken, handleReady, handlePlayerStateChanged, dispatchSpotifyState]);

  useEffect(() => {
    if (!spotifyPlayer || !isPlaying) return;

    const intervalId = setInterval(async () => {
      const state = await spotifyPlayer.getCurrentState();
      if (state && !state.paused) {
        dispatchSpotifyState({ type: spotifyReducerCases.SET_TIME_POSITION, timePosition: state.position });
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
