package application;

import domain.exception.RoomNotFoundException;
import domain.player.PlayerId;
import domain.room.Room;
import domain.room.RoomId;
import domain.room.RoomRepository;
import domain.spotify.Playlist;
import domain.spotify.PlaylistRepository;

import java.util.List;

public class SpotifyAppService {
    private final RoomRepository roomRepository;
    private final PlaylistRepository playlistRepository;

    public SpotifyAppService(RoomRepository roomRepository, PlaylistRepository playlistRepository) {
        this.roomRepository = roomRepository;
        this.playlistRepository = playlistRepository;
    }

    public List<Playlist> searchPlaylists(RoomId roomId, PlayerId playerId, String query) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        room.searchPlaylists(playerId);

        return playlistRepository.searchPlaylistsByQuery(query);
    }
}
