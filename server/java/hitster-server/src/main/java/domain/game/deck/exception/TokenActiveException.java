package domain.game.deck.exception;

import domain.game.deck.token.TokenId;
import interfaces.exception.InvalidMoveException;

public class TokenActiveException extends InvalidMoveException {
    public TokenActiveException(TokenId tokenId) {
        super("Token with ID " + tokenId + " is already in the current deck.");
    }
}
