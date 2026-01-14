package interfaces.socket.room.startGame.dto;

public record StartGameRequest(
        String roomId,
        String playerId
) {
}
