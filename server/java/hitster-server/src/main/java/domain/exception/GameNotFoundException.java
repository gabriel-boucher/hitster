package domain.exception;

import domain.game.GameId;
import interfaces.exception.NotFoundException;

public class GameNotFoundException extends NotFoundException {
    public GameNotFoundException(GameId gameId) {
        super("Game with ID " + gameId + " not found.");
    }
}
