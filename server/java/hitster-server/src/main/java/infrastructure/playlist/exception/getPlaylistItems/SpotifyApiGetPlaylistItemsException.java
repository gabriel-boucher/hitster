package infrastructure.playlist.exception.getPlaylistItems;

import domain.spotify.playlist.PlaylistId;
import domain.spotify.accessToken.AccessToken;
import interfaces.exception.UnauthorizedException;

public class SpotifyApiGetPlaylistItemsException extends UnauthorizedException {
    public SpotifyApiGetPlaylistItemsException(AccessToken accessToken, PlaylistId playlistId) {
        super("Failed to get playlist items from Spotify API with access token " + accessToken.id().toString() + " for playlist ID: " + playlistId.toString());
    }
}
