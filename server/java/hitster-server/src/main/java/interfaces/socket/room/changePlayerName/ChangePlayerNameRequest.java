package interfaces.socket.room.changePlayerName;

public record ChangePlayerNameRequest(
        String roomId,
        String playerId,
        String newName
) {
}
