package interfaces.http.deckMovement.tokenMovement.removeToken;

import domain.game.GameId;
import domain.deck.item.token.TokenId;
import domain.player.PlayerId;
import interfaces.http.deckMovement.tokenMovement.removeToken.dto.RemoveTokenData;
import interfaces.http.deckMovement.tokenMovement.removeToken.dto.RemoveTokenRequest;

public class RemoveTokenMapper {
    public RemoveTokenData toDomain(String gameId, String playerId, RemoveTokenRequest request) {
        return new RemoveTokenData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId),
                TokenId.fromString(request.tokenId())
        );
    }
}

