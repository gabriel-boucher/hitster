package interfaces.rest.auth.inMemoryAuth;

public record AuthInMemoryRequest(
        String roomId,
        String playerId
) {
}
