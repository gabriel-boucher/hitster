package application;

import domain.exception.RoomNotFoundException;
import domain.music.MusicPlayerType;
import domain.player.PlayerId;
import domain.room.Room;
import domain.room.RoomId;
import domain.room.RoomRepository;
import infrastructure.musicAuth.spotify.auth.SpotifyAuthRepository;
import infrastructure.musicAuth.spotify.apiToken.SpotifyAccessCode;

public class AuthAppService {
    private final RoomRepository roomRepository;
    private final SpotifyAuthRepository spotifyAuthRepository;

    public AuthAppService(RoomRepository roomRepository, SpotifyAuthRepository spotifyAuthRepository) {
        this.roomRepository = roomRepository;
        this.spotifyAuthRepository = spotifyAuthRepository;
    }

    public Room inMemoryAuth(RoomId roomId, PlayerId playerId) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }

        room.changeMusicPlayerType(playerId, MusicPlayerType.IN_MEMORY);

        roomRepository.saveRoom(room);

        return room;
    }

    public Room spotifyAuth(RoomId roomId, PlayerId playerId, SpotifyAccessCode spotifyAccessCode) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }

        room.changeMusicPlayerType(playerId, MusicPlayerType.SPOTIFY);

        spotifyAuthRepository.setSpotifyApiTokenByAccessCode(roomId, spotifyAccessCode);
        roomRepository.saveRoom(room);

        return room;
    }
}
