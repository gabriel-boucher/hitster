package domain.room;

public interface RoomRepository {
    Room getRoomById(RoomId roomId);

    void saveRoom(Room room);
}
