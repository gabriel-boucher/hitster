package domain.game.exception;

import domain.player.PlayerId;
import interfaces.exception.InvalidStateException;

public class InvalidPlayerTurnException extends InvalidStateException {
    public InvalidPlayerTurnException(PlayerId playerId) {
        super("Invalid turn for player with ID: " + playerId);
    }
}
