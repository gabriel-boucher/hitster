package interfaces.socket.game.addToken.dto;

import domain.game.GameId;
import domain.game.item.token.TokenId;
import domain.player.PlayerId;

public record AddTokenData(
        GameId gameId,
        PlayerId playerId,
        TokenId tokenId,
        int position
) {
}
