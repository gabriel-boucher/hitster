package interfaces.socket.game.removeToken;

import domain.game.GameId;
import domain.game.item.token.TokenId;
import domain.player.PlayerId;

public record RemoveTokenData(
        GameId gameId,
        PlayerId playerId,
        TokenId tokenId
) {
}
