package domain.game.currentDeck.exception;

import domain.game.item.token.TokenId;
import interfaces.exception.InvalidMoveException;

public class TokenActiveException extends InvalidMoveException {
    public TokenActiveException(TokenId tokenId) {
        super("Token with ID " + tokenId + " is already in the current deck.");
    }
}
