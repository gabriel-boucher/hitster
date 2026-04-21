package domain.room.exception;

import domain.player.PlayerColor;
import domain.player.PlayerId;
import interfaces.exception.InvalidStateException;

public class PlayerColorAlreadyExistsException extends InvalidStateException {
    public PlayerColorAlreadyExistsException(PlayerId playerId, PlayerColor color) {
        super("Player with name '" + color.toString().toLowerCase() + "' already exists in the room for player ID: " + playerId.toString());
    }
}
