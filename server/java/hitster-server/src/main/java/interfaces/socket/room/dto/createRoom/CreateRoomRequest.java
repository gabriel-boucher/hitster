package interfaces.socket.room.dto.createRoom;

public record CreateRoomRequest(
        String roomId,
        String playerId
) {
}
