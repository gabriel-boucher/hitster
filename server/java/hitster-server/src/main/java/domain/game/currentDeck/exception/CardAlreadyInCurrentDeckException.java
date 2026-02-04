package domain.game.currentDeck.exception;

import interfaces.exception.InvalidMoveException;

public class CardAlreadyInCurrentDeckException extends InvalidMoveException {
    public CardAlreadyInCurrentDeckException() {
        super("Current card is already in the current deck.");
    }
}
