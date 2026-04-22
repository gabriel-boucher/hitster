package interfaces.http.game.moveCurrentCard.dto;

public record MoveCurrentCardRequest(
        String gameId,
        String playerId,
        int position
) {
}

