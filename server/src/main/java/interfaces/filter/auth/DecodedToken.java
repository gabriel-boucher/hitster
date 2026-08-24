package interfaces.filter.auth;

public record DecodedToken(
        String playerId,
        String gameId) {
}
