package domain.game.currentDeck.exception;

import domain.game.item.token.TokenId;
import interfaces.exception.InvalidMoveException;

public class TokenAlreadyInPlayerDeckException extends InvalidMoveException {
    public TokenAlreadyInPlayerDeckException(TokenId tokenId) {
        super("Token with ID " + tokenId + " is not in the current deck.");
    }
}
