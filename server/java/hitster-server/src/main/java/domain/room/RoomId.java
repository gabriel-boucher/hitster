package domain.room;

import java.util.UUID;

public record RoomId(UUID id) {
    public static RoomId create() {
        return new RoomId(UUID.randomUUID());
    }

    public static RoomId fromString(String id) {
        return new RoomId(UUID.fromString(id));
    }

    @Override
    public String toString() {
        return id.toString();
    }
}
