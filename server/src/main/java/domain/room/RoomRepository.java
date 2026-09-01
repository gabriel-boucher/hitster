package domain.room;

import domain.game.GameId;

import java.util.Optional;

public interface RoomRepository {
    Optional<Room> getRoomById(GameId gameId);
    void saveRoom(Room room);
    void deleteRoom(GameId gameId);
}
