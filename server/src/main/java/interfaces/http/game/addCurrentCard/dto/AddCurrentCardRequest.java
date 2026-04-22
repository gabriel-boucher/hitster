package interfaces.http.game.addCurrentCard.dto;

public record AddCurrentCardRequest(
        String gameId,
        String playerId
) {
}

