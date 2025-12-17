package interfaces.socket.game.dto.removeCurrentCard;

public record RemoveCurrentCardRequest(
        String gameId,
        String playerId
) {
}
