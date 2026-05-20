package interfaces.http.room.startGame.dto;

public record StartGameRequest(
        String gameId,
        String playerId
) {
}
