package interfaces.http.room.joinRoom.dto;

public record JoinRoomRequest(
        String roomId,
        String playerId
) {
}
