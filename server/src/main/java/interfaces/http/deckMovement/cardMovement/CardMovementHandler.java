package interfaces.http.deckMovement.cardMovement;

import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.http.deckMovement.cardMovement.dto.CardMovementRequest;
import interfaces.http.deckMovement.cardMovement.addCurrentCard.AddCurrentCardHandler;
import interfaces.http.deckMovement.cardMovement.moveCurrentCard.MoveCurrentCardHandler;
import interfaces.http.deckMovement.cardMovement.moveCurrentCard.dto.MoveCurrentCardRequest;
import interfaces.http.deckMovement.cardMovement.removeCurrentCard.RemoveCurrentCardHandler;
import interfaces.http.deckMovement.cardMovement.returnCurrentCard.ReturnCurrentCardHandler;

import static interfaces.dto.responseDto.EventResponseStatus.CARD_MOVEMENT_NOT_FOUND;

public class CardMovementHandler {

    private final AddCurrentCardHandler addCurrentCardHandler;
    private final MoveCurrentCardHandler moveCurrentCardHandler;
    private final RemoveCurrentCardHandler removeCurrentCardHandler;
    private final ReturnCurrentCardHandler returnCurrentCardHandler;

    public CardMovementHandler(AddCurrentCardHandler addCurrentCardHandler, MoveCurrentCardHandler moveCurrentCardHandler, RemoveCurrentCardHandler removeCurrentCardHandler, ReturnCurrentCardHandler returnCurrentCardHandler) {
        this.addCurrentCardHandler = addCurrentCardHandler;
        this.moveCurrentCardHandler = moveCurrentCardHandler;
        this.removeCurrentCardHandler = removeCurrentCardHandler;
        this.returnCurrentCardHandler = returnCurrentCardHandler;
    }

    public EventResponse handleEvent(String gameId, String playerId, String cardMovement, CardMovementRequest cardMovementRequest) {
        return switch (cardMovement) {
            case "add-card" -> addCurrentCardHandler.handleEvent(gameId, playerId);
            case "move-card" -> {
                MoveCurrentCardRequest request = new MoveCurrentCardRequest(cardMovementRequest.position());
                yield moveCurrentCardHandler.handleEvent(gameId, playerId, request);
            }
            case "remove-card" -> removeCurrentCardHandler.handleEvent(gameId, playerId);
            case "return-card" -> returnCurrentCardHandler.handleEvent(gameId, playerId);
            default -> new NotFoundExceptionResponse(CARD_MOVEMENT_NOT_FOUND, "Card movement not found");
        };
    }
}
