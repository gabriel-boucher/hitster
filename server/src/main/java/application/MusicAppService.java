package application;

import domain.exception.GameNotFoundException;
import domain.game.GameId;
import domain.music.*;
import domain.player.PlayerId;
import domain.room.Room;
import domain.room.RoomRepository;
import infrastructure.persistence.inMemory.music.MusicRepositoryFactory;

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

    public List<Playlist> searchPlaylists(GameId gameId, PlayerId playerId, String query) {
        Room room = roomRepository.getRoomById(gameId)
                .orElseThrow(() -> new GameNotFoundException(gameId));
        musicPlayerValidator.validatePlayerCanSearchPlaylists(playerId, room.getPlayers());
        MusicRepository musicRepository = musicRepositoryFactory.getMusicRepository(room);

        return musicRepository.searchPlaylistsByQuery(gameId, query);
    }
}
