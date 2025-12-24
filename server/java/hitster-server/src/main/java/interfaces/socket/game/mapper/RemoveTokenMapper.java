package interfaces.socket.game.mapper;

import domain.game.GameId;
import domain.game.deck.token.TokenId;
import domain.player.PlayerId;
import interfaces.socket.game.dto.removeToken.RemoveTokenData;
import interfaces.socket.game.dto.removeToken.RemoveTokenRequest;

public class RemoveTokenMapper {
    public RemoveTokenData toDomain(RemoveTokenRequest request) {
        return new RemoveTokenData(
                GameId.fromString(request.gameId()),
                PlayerId.fromString(request.playerId()),
                TokenId.fromString(request.tokenId())
        );
    }
}
