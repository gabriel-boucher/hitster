package interfaces.http.music.playlistProvider.spotifyAuth;

public record AuthSpotifyRequest(
        String spotifyAccessCode
) {
}
