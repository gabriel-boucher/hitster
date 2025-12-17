package interfaces.socket.game.dto.nextTurn;

public record NextTurnRequest(
        String gameId,
        String playerId
) {
}
