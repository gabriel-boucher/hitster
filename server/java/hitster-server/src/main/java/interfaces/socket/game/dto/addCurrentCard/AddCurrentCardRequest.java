package interfaces.socket.game.dto.addCurrentCard;

public record AddCurrentCardRequest(
        String gameId,
        String playerId,
        int position
) {
}
