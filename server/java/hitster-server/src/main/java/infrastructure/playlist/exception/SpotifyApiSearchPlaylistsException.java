package infrastructure.playlist.exception;

import domain.spotify.accessToken.AccessToken;

public class SpotifyApiSearchPlaylistsException extends RuntimeException {
    public SpotifyApiSearchPlaylistsException(AccessToken accessToken, String query) {
        super("Failed to search playlists on Spotify API with access token " + accessToken.id().toString() + " and query: " + query);
    }
}
