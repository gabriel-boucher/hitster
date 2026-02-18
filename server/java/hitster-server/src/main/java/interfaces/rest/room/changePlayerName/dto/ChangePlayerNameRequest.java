package interfaces.rest.room.changePlayerName.dto;

public record ChangePlayerNameRequest(
        String roomId,
        String playerId,
        String newName
) {
}
