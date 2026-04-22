package interfaces.http.game.addToken.dto;

public record AddTokenRequest(
        String gameId,
        String playerId,
        String tokenId,
        int position
) {
}

