package domain.game.exception;

import interfaces.exception.InvalidStateException;

public class InvalidPileException extends InvalidStateException {
    public InvalidPileException() {
        super("Pile is empty, no current card available.");
    }
}
