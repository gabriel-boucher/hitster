package interfaces.http.deckMovement.cardMovement.returnCurrentCard;

import application.GameAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.GameNotFoundException;
import domain.deck.currentDeck.exception.CardAlreadyInStackException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.deckMovement.cardMovement.returnCurrentCard.dto.ReturnCurrentCardData;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class ReturnCurrentCardHandler implements RestEventHandler {
    private final GameAppService gameAppService;
    private final ReturnCurrentCardMapper returnCurrentCardMapper;

    public ReturnCurrentCardHandler(GameAppService gameAppService, ReturnCurrentCardMapper returnCurrentCardMapper) {
        this.gameAppService = gameAppService;
        this.returnCurrentCardMapper = returnCurrentCardMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId) {
        try {
            ReturnCurrentCardData data = returnCurrentCardMapper.toDomain(gameId, playerId);
            gameAppService.returnCurrentCard(data.gameId(), data.playerId());

            return new OkSuccessResponse<>(RETURN_CURRENT_CARD, "Current card returned successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (CardAlreadyInStackException e) {
            return new BadRequestExceptionResponse(CARD_ALREADY_IN_PILE, e.getMessage());
        }
    }
}

