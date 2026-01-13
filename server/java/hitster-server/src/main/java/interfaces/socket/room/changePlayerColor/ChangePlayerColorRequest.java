package interfaces.socket.room.changePlayerColor;

public record ChangePlayerColorRequest(
        String roomId,
        String playerId,
        String newColor
) {
}
