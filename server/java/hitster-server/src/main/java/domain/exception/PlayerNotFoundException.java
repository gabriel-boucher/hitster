package domain.exception;

import domain.player.PlayerId;
import interfaces.exception.NotFoundException;

public class PlayerNotFoundException extends NotFoundException {
    public PlayerNotFoundException(PlayerId playerId) {
        super("Player with ID " + playerId + " not found.");
    }
}
