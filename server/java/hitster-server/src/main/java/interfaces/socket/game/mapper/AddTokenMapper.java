package interfaces.socket.game.mapper;

import domain.game.GameId;
import domain.game.item.token.TokenId;
import domain.player.PlayerId;
import interfaces.socket.game.dto.addToken.AddTokenData;
import interfaces.socket.game.dto.addToken.AddTokenRequest;

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
