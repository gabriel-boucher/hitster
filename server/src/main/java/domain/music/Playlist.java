package domain.music;

public record Playlist(
        PlaylistId id,
        String name,
        String imageUrl,
        int totalTracks
) {
}
