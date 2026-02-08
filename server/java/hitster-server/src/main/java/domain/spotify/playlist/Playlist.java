package domain.spotify.playlist;

public record Playlist(
        PlaylistId id,
        String name,
        String imageUrl,
        int totalTracks
) {
}
