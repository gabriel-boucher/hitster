package domain.room.exception;

import domain.player.PlayerId;
import interfaces.exception.InvalidStateException;

public class PlayerAlreadyInRoomException extends InvalidStateException {
    public PlayerAlreadyInRoomException(PlayerId playerId) {
        super("Player with ID " + playerId + " is already in the room.");
    }
}
