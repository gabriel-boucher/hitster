package interfaces.socket.game.dto.removeToken;

import domain.game.GameId;
import domain.game.deck.token.TokenId;
import domain.game.player.PlayerId;

public record RemoveTokenData(
        GameId gameId,
        PlayerId playerId,
        TokenId tokenId
) {
}
