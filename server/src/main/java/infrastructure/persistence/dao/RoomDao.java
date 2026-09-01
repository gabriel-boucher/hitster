package infrastructure.persistence.dao;

import infrastructure.persistence.dto.RoomPersistenceDto;

import java.util.Optional;

public interface RoomDao {
    Optional<RoomPersistenceDto> getRoomByGameId(String gameId);
    void saveRoom(RoomPersistenceDto room);
    void deleteRoom(String gameId);
}
