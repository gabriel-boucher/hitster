package domain.game.deck;

import domain.game.deck.token.TokenId;

public record CurrentDeckActionParameters(
        Integer position,
        TokenId tokenId
) {
}
