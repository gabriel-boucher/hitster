package domain.exception;

import domain.spotify.PlaylistId;

public class PlaylistNotFoundException extends RuntimeException {
    public PlaylistNotFoundException(PlaylistId playlistId) {
        String message = "Playlist with ID " + playlistId + " not found.";
    }
}
