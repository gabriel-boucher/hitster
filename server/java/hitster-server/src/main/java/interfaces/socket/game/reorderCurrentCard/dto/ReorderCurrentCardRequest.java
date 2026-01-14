package interfaces.socket.game.reorderCurrentCard.dto;

public record ReorderCurrentCardRequest(
        String gameId,
        String playerId,
        int newPosition
) {
}
