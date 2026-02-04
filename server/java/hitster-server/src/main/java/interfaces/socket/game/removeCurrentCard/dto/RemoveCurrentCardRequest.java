package interfaces.socket.game.removeCurrentCard.dto;

public record RemoveCurrentCardRequest(
        String gameId,
        String playerId
) {
}
