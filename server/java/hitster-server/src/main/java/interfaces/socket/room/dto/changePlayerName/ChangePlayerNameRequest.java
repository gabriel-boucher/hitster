package interfaces.socket.room.dto.changePlayerName;

public record ChangePlayerNameRequest(
        String roomId,
        String playerId,
        String newName
) {
}
