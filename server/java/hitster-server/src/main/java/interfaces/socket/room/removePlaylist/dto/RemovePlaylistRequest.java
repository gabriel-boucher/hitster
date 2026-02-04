package interfaces.socket.room.removePlaylist.dto;

public record RemovePlaylistRequest(
        String roomId,
        String playerId,
        String playlistId
) {
}
