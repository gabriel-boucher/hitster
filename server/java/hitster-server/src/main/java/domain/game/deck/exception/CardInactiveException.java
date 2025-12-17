package domain.game.deck.exception;

import interfaces.exception.InvalidMoveException;

public class CardInactiveException extends InvalidMoveException {
    public CardInactiveException() {
        super("Current card is not in the current deck.");
    }
}
