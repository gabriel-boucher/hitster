package interfaces.socket.room.removePlaylist;

public record RemovePlaylistRequest(
        String roomId,
        String playerId,
        String playlistId
) {
}
