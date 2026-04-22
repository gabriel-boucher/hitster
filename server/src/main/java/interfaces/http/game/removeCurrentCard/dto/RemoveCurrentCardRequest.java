package interfaces.http.game.removeCurrentCard.dto;

public record RemoveCurrentCardRequest(
        String gameId,
        String playerId
) {
}

