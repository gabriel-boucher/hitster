package interfaces.http.game.returnCurrentCard.dto;

public record ReturnCurrentCardRequest(
        String gameId,
        String playerId
) {
}

