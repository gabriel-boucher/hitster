package domain.player.exception;

import domain.game.item.token.TokenId;
import interfaces.exception.NotFoundException;

public class TokenNotFoundException extends NotFoundException {
    public TokenNotFoundException(TokenId tokenId) {
        super("Token with ID " + tokenId + " not found.");
    }
}
