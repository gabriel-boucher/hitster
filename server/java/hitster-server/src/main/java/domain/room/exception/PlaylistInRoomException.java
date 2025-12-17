package domain.room.exception;

import domain.spotify.PlaylistId;

public class PlaylistInRoomException extends RuntimeException {
    public PlaylistInRoomException(PlaylistId playlistId) {
        super("Playlist with ID " + playlistId + " is already in the room.");
    }
}
