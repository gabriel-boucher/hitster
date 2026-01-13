package interfaces.socket.room.removePlayer;

public record RemovePlayerRequest(
        String roomId,
        String playerId,
        String playerToRemoveId
) {
}
