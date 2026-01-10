package domain.spotify;

public record Playlist(
        PlaylistId id,
        String name,
        String imageUrl
) {
}
