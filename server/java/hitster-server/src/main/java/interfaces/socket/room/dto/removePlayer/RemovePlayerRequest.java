package interfaces.socket.room.dto.removePlayer;

public record RemovePlayerRequest(
        String roomId,
        String playerId,
        String playerToRemoveId
) {
}
