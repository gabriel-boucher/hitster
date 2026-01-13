package interfaces.socket.game.removeCurrentCard;

public record RemoveCurrentCardRequest(
        String gameId,
        String playerId
) {
}
