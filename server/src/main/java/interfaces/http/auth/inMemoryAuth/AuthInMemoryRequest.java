package interfaces.http.auth.inMemoryAuth;

public record AuthInMemoryRequest(
        String roomId,
        String playerId
) {
}
