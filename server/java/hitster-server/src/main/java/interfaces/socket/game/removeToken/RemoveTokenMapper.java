package interfaces.socket.game.removeToken;

import domain.game.GameId;
import domain.game.item.token.TokenId;
import domain.player.PlayerId;
import interfaces.socket.game.removeToken.dto.RemoveTokenData;
import interfaces.socket.game.removeToken.dto.RemoveTokenRequest;

public class RemoveTokenMapper {
    public RemoveTokenData toDomain(RemoveTokenRequest request) {
        return new RemoveTokenData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                TokenId.fromString(request.tokenId())
        );
    }
}
