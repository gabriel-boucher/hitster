package interfaces.socket.game.dto.addToken;

public record AddTokenRequest(
        String gameId,
        String playerId,
        String tokenId,
        int position
) {
}
