package infrastructure.persistence.inMemory.room.dao;

import infrastructure.persistence.dao.RoomDao;
import infrastructure.persistence.dto.RoomPersistenceDto;

import java.util.Map;
import java.util.Optional;

public class RoomInMemoryDao implements RoomDao {
    private final Map<String, RoomPersistenceDto> rooms;

    public RoomInMemoryDao(Map<String, RoomPersistenceDto> rooms) {
        this.rooms = rooms;
    }

    @Override
    public Optional<RoomPersistenceDto> getRoomByGameId(String gameId) {
        return Optional.ofNullable(rooms.get(gameId));
    }

    @Override
    public void saveRoom(RoomPersistenceDto room) {
        rooms.put(room.gameId(), room);
    }
}
