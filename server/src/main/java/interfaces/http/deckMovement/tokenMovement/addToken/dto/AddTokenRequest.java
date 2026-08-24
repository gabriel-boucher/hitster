package interfaces.http.deckMovement.tokenMovement.addToken.dto;

import interfaces.http.deckMovement.tokenMovement.dto.TokenMovementRequest;

public record AddTokenRequest(
        String tokenId,
        int position
) {
    public AddTokenRequest(TokenMovementRequest tokenMovementRequest) {
        this(tokenMovementRequest.tokenId(), tokenMovementRequest.position());
    }
}

