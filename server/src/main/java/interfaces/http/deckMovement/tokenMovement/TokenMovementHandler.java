package interfaces.http.deckMovement.tokenMovement;

import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.http.deckMovement.tokenMovement.dto.TokenMovementRequest;
import interfaces.http.deckMovement.tokenMovement.addToken.AddTokenHandler;
import interfaces.http.deckMovement.tokenMovement.addToken.dto.AddTokenRequest;
import interfaces.http.deckMovement.tokenMovement.removeToken.RemoveTokenHandler;
import interfaces.http.deckMovement.tokenMovement.removeToken.dto.RemoveTokenRequest;

import static interfaces.dto.responseDto.EventResponseStatus.TOKEN_MOVEMENT_NOT_FOUND;

public class TokenMovementHandler {

    private final AddTokenHandler addTokenHandler;
    private final RemoveTokenHandler removeTokenHandler;

    public TokenMovementHandler(AddTokenHandler addTokenHandler, RemoveTokenHandler removeTokenHandler) {
        this.addTokenHandler = addTokenHandler;
        this.removeTokenHandler = removeTokenHandler;
    }

    public EventResponse handleEvent(String gameId, String playerId, String tokenMovement, TokenMovementRequest tokenMovementRequest) {
        return switch (tokenMovement) {
            case "add-token" -> {
                AddTokenRequest request = new AddTokenRequest(tokenMovementRequest);
                yield addTokenHandler.handleEvent(gameId, playerId, request);
            }
            case "remove-token" -> {
                RemoveTokenRequest request = new RemoveTokenRequest(tokenMovementRequest);
                yield removeTokenHandler.handleEvent(gameId, playerId, request);
            }
            default -> new NotFoundExceptionResponse(TOKEN_MOVEMENT_NOT_FOUND, "Token movement not found");
        };
    }
}
