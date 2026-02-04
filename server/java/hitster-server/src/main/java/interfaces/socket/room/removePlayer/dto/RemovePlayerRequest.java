package interfaces.socket.room.removePlayer.dto;

public record RemovePlayerRequest(
        String roomId,
        String playerId,
        String playerToRemoveId
) {
}
