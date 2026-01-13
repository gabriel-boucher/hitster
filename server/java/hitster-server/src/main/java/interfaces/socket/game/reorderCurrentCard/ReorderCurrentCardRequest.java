package interfaces.socket.game.reorderCurrentCard;

public record ReorderCurrentCardRequest(
        String gameId,
        String playerId,
        int newPosition
) {
}
