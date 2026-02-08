package application;

import domain.exception.RoomNotFoundException;
import domain.player.PlayerId;
import domain.room.Room;
import domain.room.RoomId;
import domain.room.RoomRepository;
import domain.spotify.playback.DeviceId;
import domain.spotify.playback.PlaybackRepository;
import domain.spotify.playback.PlaybackState;
import domain.spotify.playlist.Playlist;
import domain.spotify.playlist.PlaylistRepository;
import domain.spotify.accessToken.AccessToken;
import domain.spotify.accessToken.AccessTokenRepository;

import java.util.List;

public class SpotifyAppService {
    private final RoomRepository roomRepository;
    private final PlaylistRepository playlistRepository;
    private final PlaybackRepository playbackRepository;

    public SpotifyAppService(RoomRepository roomRepository, PlaylistRepository playlistRepository, PlaybackRepository playbackRepository) {
        this.roomRepository = roomRepository;
        this.playlistRepository = playlistRepository;
        this.playbackRepository = playbackRepository;
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
        return room.getAccessToken(playerId);
    }

    public PlaybackState play(RoomId roomId, PlayerId playerId, DeviceId deviceId) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        AccessToken accessToken = room.getAccessToken(playerId);
        playbackRepository.play(accessToken, deviceId);

        return playbackRepository.getPlaybackState(accessToken, deviceId);
    }

    public PlaybackState pause(RoomId roomId, PlayerId playerId, DeviceId deviceId) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        AccessToken accessToken = room.getAccessToken(playerId);
        playbackRepository.pause(accessToken, deviceId);

        return playbackRepository.getPlaybackState(accessToken, deviceId);
    }

    public PlaybackState setVolume(RoomId roomId, PlayerId playerId, DeviceId deviceId, int volumePercent) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        AccessToken accessToken = room.getAccessToken(playerId);
        playbackRepository.setVolume(accessToken, deviceId, volumePercent);

        return playbackRepository.getPlaybackState(accessToken, deviceId);
    }

    public PlaybackState seekToPosition(RoomId roomId, PlayerId playerId, DeviceId deviceId, int positionMs) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        AccessToken accessToken = room.getAccessToken(playerId);
        playbackRepository.seekToPosition(accessToken, deviceId, positionMs);

        return playbackRepository.getPlaybackState(accessToken, deviceId);
    }

    public PlaybackState getPlaybackState(RoomId roomId, PlayerId playerId, DeviceId deviceId) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        AccessToken accessToken = room.getAccessToken(playerId);
        return playbackRepository.getPlaybackState(accessToken, deviceId);
    }
}
