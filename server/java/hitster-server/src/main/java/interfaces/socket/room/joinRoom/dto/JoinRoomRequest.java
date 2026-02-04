package interfaces.socket.room.joinRoom.dto;

public record JoinRoomRequest(
        String roomId,
        String playerId
) {
}
