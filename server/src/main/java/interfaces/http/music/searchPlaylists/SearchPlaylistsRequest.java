package interfaces.http.music.searchPlaylists;

public record SearchPlaylistsRequest(
        String roomId,
        String playerId,
        String query
) {
}
