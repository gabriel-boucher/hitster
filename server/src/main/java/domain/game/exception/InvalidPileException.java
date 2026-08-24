package domain.game.exception;

import interfaces.exception.InvalidStateException;

public class InvalidPileException extends InvalidStateException {
    public InvalidPileException() {
        super("Stack is empty, no current card available.");
    }
}
