package interfaces.socket.game.startGame;

public record StartGameRequest(
        String roomId,
        String playerId
) {
}
