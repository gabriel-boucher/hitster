package interfaces.socket.game.addCurrentCard;

public record AddCurrentCardRequest(
        String gameId,
        String playerId,
        int position
) {
}
