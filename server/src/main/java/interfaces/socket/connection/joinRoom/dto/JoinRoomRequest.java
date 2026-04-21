package interfaces.socket.connection.joinRoom.dto;

public record JoinRoomRequest(
        String roomId,
        String playerId
) {
}
