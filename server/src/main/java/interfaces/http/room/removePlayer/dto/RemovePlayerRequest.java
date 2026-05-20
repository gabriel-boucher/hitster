package interfaces.http.room.removePlayer.dto;

public record RemovePlayerRequest(
        String gameId,
        String playerId,
        String playerToRemoveId
) {
}
