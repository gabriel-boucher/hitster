package interfaces.rest.room.startGame.dto;

public record StartGameRequest(
        String roomId,
        String playerId
) {
}
