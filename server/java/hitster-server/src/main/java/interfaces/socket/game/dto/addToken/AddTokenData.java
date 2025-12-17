package interfaces.socket.game.dto.addToken;

import domain.game.GameId;
import domain.game.deck.token.TokenId;
import domain.game.player.PlayerId;

public record AddTokenData(
        GameId gameId,
        PlayerId playerId,
        TokenId tokenId,
        int position
) {
}
