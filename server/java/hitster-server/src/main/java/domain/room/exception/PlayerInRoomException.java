package domain.room.exception;

import domain.player.PlayerId;
import interfaces.exception.InvalidStateException;

public class PlayerInRoomException extends InvalidStateException {
    public PlayerInRoomException(PlayerId playerId) {
        super("Player with ID " + playerId + " is already in the room.");
    }
}
