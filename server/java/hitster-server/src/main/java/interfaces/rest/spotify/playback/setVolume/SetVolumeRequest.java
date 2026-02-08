package interfaces.rest.spotify.playback.setVolume;

public record SetVolumeRequest(
        String deviceId,
        int volumePercent
) {
}

