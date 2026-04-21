package infrastructure.room;

import domain.room.Room;
import domain.room.RoomId;
import domain.room.RoomRepository;

import java.util.HashMap;

public class InMemoryRoomRepository implements RoomRepository {
    private final HashMap<RoomId, Room> rooms;

    public InMemoryRoomRepository() {
        this.rooms = new HashMap<>();
    }

    @Override
    public Room getRoomById(RoomId roomId) {
        return rooms.get(roomId);
    }

    @Override
    public void saveRoom(Room room) {
        rooms.put(room.getId(), room);
    }
}
