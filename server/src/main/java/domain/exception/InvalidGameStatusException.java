package domain.exception;

import domain.game.GameStatus;
import interfaces.exception.InvalidStateException;

public class InvalidGameStatusException extends InvalidStateException {
    public InvalidGameStatusException(GameStatus gameStatus) {
        super("Invalid game status: " + gameStatus);
    }
}
