package domain.room.exception;

import domain.music.PlaylistId;
import interfaces.exception.InvalidStateException;

public class PlaylistAlreadyInRoomException extends InvalidStateException {
    public PlaylistAlreadyInRoomException(PlaylistId playlistId) {
        super("Playlist with ID " + playlistId + " is already in the room.");
    }
}
