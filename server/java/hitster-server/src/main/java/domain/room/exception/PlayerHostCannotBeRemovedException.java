package domain.room.exception;

import domain.player.PlayerId;
import interfaces.exception.InvalidStateException;

public class PlayerHostCannotBeRemovedException extends InvalidStateException {
    public PlayerHostCannotBeRemovedException(PlayerId playerId) {
        super("Player with ID '" + playerId.toString() + "' is the host and cannot be removed from the room.");
    }
}
