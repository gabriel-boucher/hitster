package interfaces.http.room.changePlayerColor.dto;

public record ChangePlayerColorRequest(
        String gameId,
        String playerId,
        String newColor
) {
}
