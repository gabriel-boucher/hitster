package application;

import domain.exception.RoomNotFoundException;
import domain.music.*;
import domain.player.PlayerId;
import domain.room.Room;
import domain.room.RoomId;
import domain.room.RoomRepository;
import infrastructure.music.MusicRepositoryFactory;

import java.util.List;

public class MusicAppService {
    private final RoomRepository roomRepository;
    private final MusicRepositoryFactory musicRepositoryFactory;
    private final MusicPlayerValidator musicPlayerValidator;

    public MusicAppService(RoomRepository roomRepository, MusicRepositoryFactory musicRepositoryFactory, MusicPlayerValidator musicPlayerValidator) {
        this.roomRepository = roomRepository;
        this.musicRepositoryFactory = musicRepositoryFactory;
        this.musicPlayerValidator = musicPlayerValidator;
    }

    public List<Playlist> searchPlaylists(RoomId roomId, PlayerId playerId, String query) {
        Room room = roomRepository.getRoomById(roomId);
        if (room == null) {
            throw new RoomNotFoundException(roomId);
        }
        musicPlayerValidator.validatePlayerCanSearchPlaylists(playerId, room.getPlayers());
        MusicRepository musicRepository = musicRepositoryFactory.getMusicRepository(room);

        return musicRepository.searchPlaylistsByQuery(roomId, query);
    }
}
