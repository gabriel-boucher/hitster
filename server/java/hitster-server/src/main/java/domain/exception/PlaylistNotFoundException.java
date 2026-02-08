package domain.exception;

import domain.spotify.playlist.PlaylistId;
import interfaces.exception.NotFoundException;

public class PlaylistNotFoundException extends NotFoundException {
    public PlaylistNotFoundException(PlaylistId playlistId) {
        super("Playlist with ID " + playlistId + " not found.");
    }
}
