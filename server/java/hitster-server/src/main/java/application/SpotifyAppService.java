package application;

import domain.exception.RoomNotFoundException;
import domain.player.PlayerId;
import domain.room.Room;
import domain.room.RoomId;
import domain.room.RoomRepository;
import domain.spotify.Playlist;
import domain.spotify.PlaylistRepository;
import domain.spotify.accessToken.AccessToken;
import domain.spotify.accessToken.AccessTokenId;
import domain.spotify.accessToken.AccessTokenRepository;

import java.util.List;

public class SpotifyAppService {
    private final RoomRepository roomRepository;
    private final PlaylistRepository playlistRepository;
    private final AccessTokenRepository accessTokenRepository;

    public SpotifyAppService(RoomRepository roomRepository, PlaylistRepository playlistRepository, AccessTokenRepository accessTokenRepository) {
        this.roomRepository = roomRepository;
        this.playlistRepository = playlistRepository;
        this.accessTokenRepository = accessTokenRepository;
    }

    public List<Playlist> searchPlaylists(RoomId roomId, PlayerId playerId, String query) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        room.searchPlaylists(playerId);

        return playlistRepository.searchPlaylistsByQuery(room.getAccessToken(), query);
    }

    public AccessToken getAccessToken(RoomId roomId, PlayerId playerId) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        AccessToken accessToken = room.getAccessToken();

        return accessToken;
    }
}
