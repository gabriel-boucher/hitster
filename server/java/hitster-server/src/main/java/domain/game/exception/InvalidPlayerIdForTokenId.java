package domain.game.exception;

import domain.game.item.token.TokenId;
import domain.player.PlayerId;

public class InvalidPlayerIdForTokenId extends RuntimeException {
    public InvalidPlayerIdForTokenId(TokenId tokenId, PlayerId playerId) {
        super("Token ID " + tokenId + " does not belong to Player ID " + playerId);
    }
}
