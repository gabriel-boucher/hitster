package interfaces.http.room.changePlayerColor.dto;

public record ChangePlayerColorRequest(
        String roomId,
        String playerId,
        String newColor
) {
}
