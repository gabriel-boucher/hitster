package interfaces.socket.game.moveCurrentCard.dto;

public record MoveCurrentCardRequest(
        String gameId,
        String playerId,
        int position
) {
}
