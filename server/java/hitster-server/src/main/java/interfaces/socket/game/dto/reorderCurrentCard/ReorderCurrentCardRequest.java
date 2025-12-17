package interfaces.socket.game.dto.reorderCurrentCard;

public record ReorderCurrentCardRequest(
        String gameId,
        String playerId,
        int newPosition
) {
}
