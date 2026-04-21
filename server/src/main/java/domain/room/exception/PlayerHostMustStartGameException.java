package domain.room.exception;

import domain.player.PlayerId;
import interfaces.exception.InvalidStateException;

public class PlayerHostMustStartGameException extends InvalidStateException {
    public PlayerHostMustStartGameException(PlayerId playerId) {
        super("Player with ID '" + playerId.toString() + "' is not the host and cannot start the game.");
    }
}
