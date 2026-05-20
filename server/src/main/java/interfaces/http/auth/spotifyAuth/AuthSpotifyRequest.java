package interfaces.http.auth.spotifyAuth;


public record AuthSpotifyRequest(
        String gameId,
        String playerId,
        String spotifyAccessCode
) {
}
