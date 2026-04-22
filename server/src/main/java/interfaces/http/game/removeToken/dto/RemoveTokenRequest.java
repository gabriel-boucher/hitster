package interfaces.http.game.removeToken.dto;

public record RemoveTokenRequest(
        String gameId,
        String playerId,
        String tokenId
) {
}

