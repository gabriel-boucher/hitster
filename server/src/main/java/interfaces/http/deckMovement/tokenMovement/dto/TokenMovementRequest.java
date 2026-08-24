package interfaces.http.deckMovement.tokenMovement.dto;

public record TokenMovementRequest(
        String tokenId,
        int position
) {
}
