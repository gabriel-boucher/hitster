package interfaces.http.music.removePlaylist.dto;

public record RemovePlaylistRequest(
        String roomId,
        String playerId,
        String playlistId
) {
}

