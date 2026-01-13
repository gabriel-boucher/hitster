package interfaces.socket.game.addToken;

import domain.game.GameId;
import domain.game.item.token.TokenId;
import domain.player.PlayerId;

public class AddTokenMapper {
    public AddTokenData toDomain(AddTokenRequest request) {
        return new AddTokenData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                TokenId.fromString(request.tokenId()),
                request.position()
        );
    }
}
