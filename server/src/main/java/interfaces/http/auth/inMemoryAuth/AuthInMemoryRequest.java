package interfaces.http.auth.inMemoryAuth;

public record AuthInMemoryRequest(
        String gameId,
        String playerId
) {
}
