package infrastructure.persistence.inMemory.music.exception.searchPlaylists;

import infrastructure.persistence.inMemory.musicAuth.spotify.apiToken.SpotifyAccessToken;

public class SearchPlaylistsSpotifyException extends RuntimeException {
    public SearchPlaylistsSpotifyException(SpotifyAccessToken spotifyAccessToken, String query) {
        super(buildMessage(spotifyAccessToken, query));
    }

    private static String buildMessage(SpotifyAccessToken spotifyAccessToken, String query) {
        return spotifyAccessToken == null
                ? "Failed to search playlists on Spotify API with null access id and query: " + query
                : "Failed to search playlists on Spotify API with access id " + spotifyAccessToken.id().toString() + " and query: " + query;
    }
}
