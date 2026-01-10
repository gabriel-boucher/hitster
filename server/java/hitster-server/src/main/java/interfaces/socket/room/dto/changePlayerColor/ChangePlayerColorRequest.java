package interfaces.socket.room.dto.changePlayerColor;

public record ChangePlayerColorRequest(
        String roomId,
        String playerId,
        String newColor
) {
}
