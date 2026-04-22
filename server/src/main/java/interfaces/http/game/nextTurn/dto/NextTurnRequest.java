package interfaces.http.game.nextTurn.dto;

public record NextTurnRequest(
        String gameId,
        String playerId
) {
}

