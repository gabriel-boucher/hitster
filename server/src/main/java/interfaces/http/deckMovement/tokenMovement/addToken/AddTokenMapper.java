package interfaces.http.deckMovement.tokenMovement.addToken;

import domain.game.GameId;
import domain.deck.item.token.TokenId;
import domain.player.PlayerId;
import interfaces.http.deckMovement.tokenMovement.addToken.dto.AddTokenData;
import interfaces.http.deckMovement.tokenMovement.addToken.dto.AddTokenRequest;

public class AddTokenMapper {
    public AddTokenData toDomain(String gameId, String playerId, AddTokenRequest request) {
        return new AddTokenData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId),
                TokenId.fromString(request.tokenId()),
                request.position()
        );
    }
}

