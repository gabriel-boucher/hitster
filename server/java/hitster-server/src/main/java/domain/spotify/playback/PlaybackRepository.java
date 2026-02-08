package domain.spotify.playback;

import domain.spotify.accessToken.AccessToken;

public interface PlaybackRepository {
    void play(AccessToken accessToken, DeviceId deviceId);
    void pause(AccessToken accessToken, DeviceId deviceId);
    void setVolume(AccessToken accessToken, DeviceId deviceId, int volumePercent);
    void seekToPosition(AccessToken accessToken, DeviceId deviceId, int positionMs);
    PlaybackState getPlaybackState(AccessToken accessToken, DeviceId deviceId);
}
