package interfaces.http.room.joinRoom.dto;

public record JoinRoomRequest(
        String gameId,
        String playerId,
        String socketId
) {
}
