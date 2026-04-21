package domain.room.exception;

import interfaces.exception.InvalidStateException;

public class NoPlaylistSelectedException extends InvalidStateException {
    public NoPlaylistSelectedException() {
        super("No playlist selected. Please select a playlist to proceed.");
    }
}
