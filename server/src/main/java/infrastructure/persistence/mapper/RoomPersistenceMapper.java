package infrastructure.persistence.mapper;

import domain.game.GameFactory;
import domain.game.GameId;
import domain.game.GameStatus;
import domain.game.GameValidator;
import domain.music.MusicPlayerType;
import domain.music.PlaylistValidator;
import domain.player.PlayerFactory;
import domain.player.PlayerValidator;
import domain.room.Room;
import domain.room.RoomValidator;
import infrastructure.persistence.dto.GamePersistenceDto;
import infrastructure.persistence.dto.PlayerPersistenceDto;
import infrastructure.persistence.dto.PlaylistPersistenceDto;
import infrastructure.persistence.dto.RoomPersistenceDto;

import java.util.List;
import java.util.stream.Collectors;

public class RoomPersistenceMapper {
    private final PlayerPersistenceMapper playerPersistenceMapper;
    private final PlaylistPersistenceMapper playlistPersistenceMapper;

    public RoomPersistenceMapper(PlayerPersistenceMapper playerPersistenceMapper, PlaylistPersistenceMapper playlistPersistenceMapper) {
        this.playerPersistenceMapper = playerPersistenceMapper;
        this.playlistPersistenceMapper = playlistPersistenceMapper;
    }

    public Room toDomain(RoomPersistenceDto roomPersistenceDto, String gameStatusPersistenceDto, List<PlayerPersistenceDto> playerPersistenceDtos, List<PlaylistPersistenceDto> playlistPersistenceDtos) {
        return new Room(
                GameId.fromString(roomPersistenceDto.gameId()),
                GameStatus.valueOf(gameStatusPersistenceDto),
                MusicPlayerType.valueOf(roomPersistenceDto.musicPlayerType()),
                playerPersistenceDtos.stream().map(playerPersistenceMapper::toDomain).collect(Collectors.toList()),
                playlistPersistenceDtos.stream().map(playlistPersistenceMapper::toDomain).collect(Collectors.toList()),
                new GameFactory(),
                new PlayerFactory(),
                new RoomValidator(new PlayerValidator(), new PlaylistValidator(), new GameValidator())
        );
    }

    public RoomPersistenceDto toDto(Room room) {
        return new RoomPersistenceDto(
                room.getId().toString(),
                room.getMusicPlayerType().name()
        );
    }
}
