package domain.room.exception;

import domain.player.PlayerId;
import interfaces.exception.InvalidStateException;

public class PlayerNameAlreadyExistsException extends InvalidStateException {
    public PlayerNameAlreadyExistsException(PlayerId playerId, String name) {
        super("Player with name '" + name + "' already exists in the room for player ID: " + playerId.toString());
    }
}
