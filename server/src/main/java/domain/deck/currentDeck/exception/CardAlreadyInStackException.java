package domain.deck.currentDeck.exception;

import interfaces.exception.InvalidMoveException;

public class CardAlreadyInStackException extends InvalidMoveException {
    public CardAlreadyInStackException() {
        super("Current card is already in the stack.");
    }
}
