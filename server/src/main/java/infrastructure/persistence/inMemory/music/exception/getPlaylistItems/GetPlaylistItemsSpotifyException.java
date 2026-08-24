package infrastructure.persistence.inMemory.music.exception.getPlaylistItems;

import domain.music.PlaylistId;
import infrastructure.persistence.inMemory.musicAuth.spotify.apiToken.SpotifyAccessToken;
import interfaces.exception.UnauthorizedException;

public class GetPlaylistItemsSpotifyException extends UnauthorizedException {
    public GetPlaylistItemsSpotifyException(SpotifyAccessToken spotifyAccessToken, PlaylistId playlistId) {
        super("Failed to get playlist items from Spotify API with access id " + spotifyAccessToken.id().toString() + " for playlist ID: " + playlistId.toString());
    }
}
