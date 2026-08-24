package interfaces.http.deckMovement.tokenMovement.addToken.dto;

import domain.game.GameId;
import domain.deck.item.token.TokenId;
import domain.player.PlayerId;

public record AddTokenData(
        GameId gameId,
        PlayerId playerId,
        TokenId tokenId,
        int position
) {
}

