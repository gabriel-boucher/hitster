package interfaces.http.deckMovement.tokenMovement.removeToken.dto;

import interfaces.http.deckMovement.tokenMovement.dto.TokenMovementRequest;

public record RemoveTokenRequest(
        String tokenId
) {
    public RemoveTokenRequest(TokenMovementRequest request) {
        this(request.tokenId());
    }
}

