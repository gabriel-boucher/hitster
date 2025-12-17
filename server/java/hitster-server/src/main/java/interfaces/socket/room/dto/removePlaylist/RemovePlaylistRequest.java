package interfaces.socket.room.dto.removePlaylist;

public record RemovePlaylistRequest(
        String roomId,
        String playerId,
        String playlistId
) {
}
