package interfaces.socket.game.removeToken;

public record RemoveTokenRequest(
        String gameId,
        String playerId,
        String tokenId
) {
}
