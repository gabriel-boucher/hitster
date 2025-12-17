package domain.game.deck.exception;

import interfaces.exception.InvalidMoveException;

public class CardActiveException extends InvalidMoveException {
    public CardActiveException() {
        super("Current card is already in the current deck.");
    }
}
