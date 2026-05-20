package interfaces.http.room.changePlayerName.dto;

public record ChangePlayerNameRequest(
        String gameId,
        String playerId,
        String newName
) {
}
