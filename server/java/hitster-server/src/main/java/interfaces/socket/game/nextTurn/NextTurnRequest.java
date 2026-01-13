package interfaces.socket.game.nextTurn;

public record NextTurnRequest(
        String gameId,
        String playerId
) {
}
