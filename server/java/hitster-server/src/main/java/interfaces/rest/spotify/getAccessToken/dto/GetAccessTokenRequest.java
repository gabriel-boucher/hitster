package interfaces.rest.spotify.getAccessToken.dto;

public record GetAccessTokenRequest(
        String roomId,
        String playerId
) {
}
