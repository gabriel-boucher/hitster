package interfaces.socket.game.returnCurrentCard.dto;

public record ReturnCurrentCardRequest(
        String gameId,
        String playerId
) {
}
