package interfaces.http.auth.spotifyAuth;


public record AuthSpotifyRequest(
        String roomId,
        String playerId,
        String spotifyAccessCode
) {
}
