package interfaces.http.room.removePlayer.dto;

public record RemovePlayerRequest(
        String roomId,
        String playerId,
        String playerToRemoveId
) {
}
