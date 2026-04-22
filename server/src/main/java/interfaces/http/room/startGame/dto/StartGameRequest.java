package interfaces.http.room.startGame.dto;

public record StartGameRequest(
        String roomId,
        String playerId
) {
}
