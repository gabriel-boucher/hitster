package interfaces.socket.game.addCurrentCard.dto;

public record AddCurrentCardRequest(
        String gameId,
        String playerId,
        int position
) {
}
