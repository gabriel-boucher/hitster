package infrastructure.persistence.inMemory.room;

import domain.game.GameId;
import domain.room.Room;
import domain.room.RoomRepository;
import infrastructure.persistence.dao.*;
import infrastructure.persistence.dto.*;
import infrastructure.persistence.mapper.PlayerPersistenceMapper;
import infrastructure.persistence.mapper.PlaylistPersistenceMapper;
import infrastructure.persistence.mapper.RoomPersistenceMapper;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class InMemoryRoomRepository implements RoomRepository {
    private final RoomDao roomDao;
    private final GameStatusDao gameStatusDao;
    private final PlayerDao playerDao;
    private final PlaylistDao playlistDao;
    private final RoomPersistenceMapper roomPersistenceMapper;
    private final PlayerPersistenceMapper playerPersistenceMapper;
    private final PlaylistPersistenceMapper playlistPersistenceMapper;

    public InMemoryRoomRepository(RoomDao roomDao, GameStatusDao gameStatusDao, PlayerDao playerDao, PlaylistDao playlistDao,
                                  RoomPersistenceMapper roomPersistenceMapper, PlayerPersistenceMapper playerPersistenceMapper, PlaylistPersistenceMapper playlistPersistenceMapper) {
        this.roomDao = roomDao;
        this.gameStatusDao = gameStatusDao;
        this.playerDao = playerDao;
        this.playlistDao = playlistDao;
        this.roomPersistenceMapper = roomPersistenceMapper;
        this.playerPersistenceMapper = playerPersistenceMapper;
        this.playlistPersistenceMapper = playlistPersistenceMapper;
    }

    @Override
    public Optional<Room> getRoomById(GameId gameId) {
        Optional<RoomPersistenceDto> roomPersistenceDto = roomDao.getRoomByGameId(gameId.toString());
        Optional<String> gameStatusPersistenceDto = gameStatusDao.getGameStatusByGameId(gameId.toString());
        List<PlayerPersistenceDto> playerPersistenceDtos = playerDao.getPlayersByGameId(gameId.toString());
        List<PlaylistPersistenceDto> playlistPersistenceDtos = playlistDao.getPlaylistsByGameId(gameId.toString());

        return roomPersistenceDto.flatMap(room ->
                gameStatusPersistenceDto.map(gameStatus ->
                        roomPersistenceMapper.toDomain(
                                room,
                                gameStatus,
                                playerPersistenceDtos,
                                playlistPersistenceDtos
                        )
                )
        );
    }

    @Override
    public void saveRoom(Room room) {
        RoomPersistenceDto roomPersistenceDto = roomPersistenceMapper.toDto(room);
        roomDao.saveRoom(roomPersistenceDto);

        String gameStatus = room.getGameStatus().toString();
        gameStatusDao.saveByGameId(room.getId().toString(), gameStatus);

        List<PlayerPersistenceDto> playerPersistenceDtos = room.getPlayers().stream()
                .map(playerPersistenceMapper::toDto).collect(Collectors.toList());
        playerDao.saveByGameId(room.getId().toString(), playerPersistenceDtos);

        List<PlaylistPersistenceDto> playlistPersistenceDtos = room.getPlaylists().stream()
                .map(playlistPersistenceMapper::toDto).collect(Collectors.toList());
        playlistDao.saveByGameId(room.getId().toString(), playlistPersistenceDtos);
    }
}
