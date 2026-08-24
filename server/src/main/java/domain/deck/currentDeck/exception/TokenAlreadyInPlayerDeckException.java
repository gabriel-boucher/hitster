package domain.deck.currentDeck.exception;

import domain.deck.item.token.TokenId;
import interfaces.exception.InvalidMoveException;

public class TokenAlreadyInPlayerDeckException extends InvalidMoveException {
    public TokenAlreadyInPlayerDeckException(TokenId tokenId) {
        super("Token with ID " + tokenId + " is not in the current deck.");
    }
}
