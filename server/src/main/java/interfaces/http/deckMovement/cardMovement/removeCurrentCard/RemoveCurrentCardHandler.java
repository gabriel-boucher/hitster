package interfaces.http.deckMovement.cardMovement.removeCurrentCard;

import application.GameAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.GameNotFoundException;
import domain.deck.currentDeck.exception.CardNotInCurrentDeckException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.deckMovement.cardMovement.removeCurrentCard.dto.RemoveCurrentCardData;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class RemoveCurrentCardHandler implements RestEventHandler {
    private final GameAppService gameAppService;
    private final RemoveCurrentCardMapper removeCurrentCardMapper;

    public RemoveCurrentCardHandler(GameAppService gameAppService, RemoveCurrentCardMapper removeCurrentCardMapper) {
        this.gameAppService = gameAppService;
        this.removeCurrentCardMapper = removeCurrentCardMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId) {
        try {
            RemoveCurrentCardData data = removeCurrentCardMapper.toDomain(gameId, playerId);
            gameAppService.removeCurrentCard(data.gameId(), data.playerId());

            return new OkSuccessResponse<>(REMOVE_CURRENT_CARD, "Current card removed successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (CardNotInCurrentDeckException e) {
            return new BadRequestExceptionResponse(CARD_NOT_IN_CURRENT_DECK, e.getMessage());
        }
    }
}

