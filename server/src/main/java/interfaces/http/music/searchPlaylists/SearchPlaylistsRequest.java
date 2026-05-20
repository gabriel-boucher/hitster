package interfaces.http.music.searchPlaylists;

public record SearchPlaylistsRequest(
        String gameId,
        String playerId,
        String query
) {
}
