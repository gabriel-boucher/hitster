package domain.music;

import domain.exception.PlaylistNotFoundException;
import domain.room.exception.PlaylistAlreadyInRoomException;

import java.util.List;

public class PlaylistValidator {
    public void validatePlaylistExist(PlaylistId playlistId, List<Playlist> playlists) {
        boolean playlistExists = playlists.stream()
                .anyMatch(playlist -> playlist.id().equals(playlistId));
        if (!playlistExists) {
            throw new PlaylistNotFoundException(playlistId);
        }
    }

    public void validatePlaylistNotExist(PlaylistId playlistId, List<Playlist> playlists) {
        boolean playlistExists = playlists.stream()
                .anyMatch(playlist -> playlist.id().equals(playlistId));
        if (playlistExists) {
            throw new PlaylistAlreadyInRoomException(playlistId);
        }
    }
}
