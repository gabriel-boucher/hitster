package infrastructure.music.exception.searchPlaylists;

import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessToken;

public class SearchPlaylistsSpotifyException extends RuntimeException {
    public SearchPlaylistsSpotifyException(SpotifyAccessToken spotifyAccessToken, String query) {
        super(buildMessage(spotifyAccessToken, query));
    }

    private static String buildMessage(SpotifyAccessToken spotifyAccessToken, String query) {
        return spotifyAccessToken == null
                ? "Failed to search playlists on Spotify API with null access token and query: " + query
                : "Failed to search playlists on Spotify API with access token " + spotifyAccessToken.id().toString() + " and query: " + query;
    }
}
