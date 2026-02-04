package domain.game.currentDeck.exception;

import interfaces.exception.InvalidMoveException;

public class CardAlreadyInPileException extends InvalidMoveException {
    public CardAlreadyInPileException() {
        super("Current card is already in the pile.");
    }
}
