package domain.room;

public record RoomId(String id) {
    public static RoomId fromString(String id) {
        return new RoomId(id);
    }

    @Override
    public String toString() {
        return id.toString();
    }
}
