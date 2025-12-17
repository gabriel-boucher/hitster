package interfaces.socket.game.dto.removeToken;

public record RemoveTokenRequest(
        String gameId,
        String playerId,
        String tokenId
) {
}
