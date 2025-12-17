package domain.exception;

import domain.game.player.PlayerId;
import interfaces.exception.IllegalMoveException;

public class IllegalPlayerException extends IllegalMoveException {
    public IllegalPlayerException(PlayerId playerId) {
        super("Player with ID " + playerId + " is inactive.");
    }
}
