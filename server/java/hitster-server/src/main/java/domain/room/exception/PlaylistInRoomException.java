package domain.room.exception;

import domain.spotify.PlaylistId;
import interfaces.exception.InvalidStateException;

public class PlaylistInRoomException extends InvalidStateException {
    public PlaylistInRoomException(PlaylistId playlistId) {
        super("Playlist with ID " + playlistId + " is already in the room.");
    }
}
