package domain.exception;

import domain.game.player.PlayerId;
import interfaces.exception.InvalidMoveException;

public class InvalidPlayerException extends InvalidMoveException {
    public InvalidPlayerException(PlayerId playerId) {
        super("Player with ID " + playerId + " is inactive.");
    }
}
