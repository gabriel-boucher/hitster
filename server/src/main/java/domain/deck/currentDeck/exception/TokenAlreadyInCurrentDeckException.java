package domain.deck.currentDeck.exception;

import domain.deck.item.token.TokenId;
import interfaces.exception.InvalidMoveException;

public class TokenAlreadyInCurrentDeckException extends InvalidMoveException {
    public TokenAlreadyInCurrentDeckException(TokenId tokenId) {
        super("Token with ID " + tokenId + " is already in the current deck.");
    }
}
