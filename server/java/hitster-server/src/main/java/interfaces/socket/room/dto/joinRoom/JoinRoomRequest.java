package interfaces.socket.room.dto.joinRoom;

public record JoinRoomRequest(
        String roomId,
        String playerId
) {
}
