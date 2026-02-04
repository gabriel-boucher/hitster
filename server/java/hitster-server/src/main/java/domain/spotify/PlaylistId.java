package domain.spotify;

public record PlaylistId(String id) {
    @Override
    public String toString() {
        return id;
    }
}
