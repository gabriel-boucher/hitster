package interfaces.socket.game.addToken.dto;

public record AddTokenRequest(
        String gameId,
        String playerId,
        String tokenId,
        int position
) {
}
