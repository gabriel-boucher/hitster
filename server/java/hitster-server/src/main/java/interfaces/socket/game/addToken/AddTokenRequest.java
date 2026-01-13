package interfaces.socket.game.addToken;

public record AddTokenRequest(
        String gameId,
        String playerId,
        String tokenId,
        int position
) {
}
