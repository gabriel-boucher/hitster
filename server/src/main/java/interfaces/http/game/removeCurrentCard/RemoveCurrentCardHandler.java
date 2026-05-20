package interfaces.http.game.removeCurrentCard;

import application.GameAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.GameNotFoundException;
import domain.game.currentDeck.exception.CardNotInCurrentDeckException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.game.removeCurrentCard.dto.RemoveCurrentCardData;
import interfaces.http.game.removeCurrentCard.dto.RemoveCurrentCardRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class RemoveCurrentCardHandler implements RestEventHandler<RemoveCurrentCardRequest> {
    private final GameAppService gameAppService;
    private final RemoveCurrentCardMapper removeCurrentCardMapper;

    public RemoveCurrentCardHandler(GameAppService gameAppService, RemoveCurrentCardMapper removeCurrentCardMapper) {
        this.gameAppService = gameAppService;
        this.removeCurrentCardMapper = removeCurrentCardMapper;
    }

    @Override
    public EventResponse handleEvent(RemoveCurrentCardRequest request) {
        try {
            RemoveCurrentCardData data = removeCurrentCardMapper.toDomain(request);
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

