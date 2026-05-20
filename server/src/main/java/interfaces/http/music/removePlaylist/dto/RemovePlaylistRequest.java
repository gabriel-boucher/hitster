package interfaces.http.music.removePlaylist.dto;

public record RemovePlaylistRequest(
        String gameId,
        String playerId,
        String playlistId
) {
}

