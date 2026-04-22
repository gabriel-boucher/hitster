package interfaces.http.game.addToken;

import domain.game.GameId;
import domain.game.item.token.TokenId;
import domain.player.PlayerId;
import interfaces.http.game.addToken.dto.AddTokenData;
import interfaces.http.game.addToken.dto.AddTokenRequest;

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

