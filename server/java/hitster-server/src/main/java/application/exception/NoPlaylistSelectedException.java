package application.exception;

import domain.spotify.PlaylistId;

public class NoPlaylistSelectedException extends RuntimeException {
    public NoPlaylistSelectedException() {
        super("No playlist selected. Please select a playlist to proceed.");
    }
}
