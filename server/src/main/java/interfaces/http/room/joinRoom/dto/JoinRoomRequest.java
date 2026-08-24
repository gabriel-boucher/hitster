package interfaces.http.room.joinRoom.dto;

public record JoinRoomRequest(
        String socketId,
        String playerId
) {
}
