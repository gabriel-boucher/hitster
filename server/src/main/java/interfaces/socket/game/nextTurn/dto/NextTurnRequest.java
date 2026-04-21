package interfaces.socket.game.nextTurn.dto;

public record NextTurnRequest(
        String gameId,
        String playerId
) {
}
