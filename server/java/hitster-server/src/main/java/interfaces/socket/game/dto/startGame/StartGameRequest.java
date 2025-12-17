package interfaces.socket.game.dto.startGame;

public record StartGameRequest(
        String roomId,
        String playerId
) {
}
