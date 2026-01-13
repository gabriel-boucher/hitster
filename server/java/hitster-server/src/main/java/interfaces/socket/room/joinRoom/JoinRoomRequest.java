package interfaces.socket.room.joinRoom;

public record JoinRoomRequest(
        String roomId,
        String playerId
) {
}
