package domain.spotify.playback;

public record DeviceId(String id) {
    @Override
    public String toString() {
        return id;
    }
}
