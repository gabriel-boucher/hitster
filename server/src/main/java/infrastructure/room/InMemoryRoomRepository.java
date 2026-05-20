package infrastructure.room;

import domain.game.GameId;
import domain.room.Room;
import domain.room.RoomRepository;

import java.util.HashMap;
import java.util.Optional;

public class InMemoryRoomRepository implements RoomRepository {
    private final HashMap<GameId, Room> rooms;

    public InMemoryRoomRepository() {
        this.rooms = new HashMap<>();
    }

    @Override
    public Optional<Room> getRoomById(GameId gameId) {
        return Optional.ofNullable(rooms.get(gameId));
    }

    @Override
    public void saveRoom(Room room) {
        rooms.put(room.getId(), room);
    }
}
