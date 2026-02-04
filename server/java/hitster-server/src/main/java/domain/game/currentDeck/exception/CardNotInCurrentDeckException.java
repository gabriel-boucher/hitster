package domain.game.currentDeck.exception;

import interfaces.exception.InvalidMoveException;

public class CardNotInCurrentDeckException extends InvalidMoveException {
    public CardNotInCurrentDeckException() {
        super("Current card is not in the current deck.");
    }
}
