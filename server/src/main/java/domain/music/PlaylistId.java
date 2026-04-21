package domain.music;

public record PlaylistId(String id) {
    @Override
    public String toString() {
        return id;
    }
}
