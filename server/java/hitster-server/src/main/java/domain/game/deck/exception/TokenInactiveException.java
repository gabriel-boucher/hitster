package domain.game.deck.exception;

import domain.game.deck.token.TokenId;
import interfaces.exception.InvalidMoveException;

public class TokenInactiveException extends InvalidMoveException {
    public TokenInactiveException(TokenId tokenId) {
        super("Token with ID " + tokenId + " is not in the current deck.");
    }
}
