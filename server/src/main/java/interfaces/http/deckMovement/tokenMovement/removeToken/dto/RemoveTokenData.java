package interfaces.http.deckMovement.tokenMovement.removeToken.dto;

import domain.game.GameId;
import domain.deck.item.token.TokenId;
import domain.player.PlayerId;

public record RemoveTokenData(
        GameId gameId,
        PlayerId playerId,
        TokenId tokenId
) {
}

