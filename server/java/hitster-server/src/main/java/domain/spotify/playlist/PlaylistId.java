package domain.spotify.playlist;

public record PlaylistId(String id) {
    @Override
    public String toString() {
        return id;
    }
}
