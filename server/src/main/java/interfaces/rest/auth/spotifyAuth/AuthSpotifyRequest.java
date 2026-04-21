package interfaces.rest.auth.spotifyAuth;


public record AuthSpotifyRequest(
        String roomId,
        String playerId,
        String spotifyAccessCode
) {
}
