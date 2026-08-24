package interfaces.http.deckMovement.cardMovement.addCurrentCard;

import application.GameAppService;
import domain.exception.GameNotFoundException;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.deck.currentDeck.exception.CardAlreadyInCurrentDeckException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.deckMovement.cardMovement.addCurrentCard.dto.AddCurrentCardData;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AddCurrentCardHandler implements RestEventHandler {
    private final GameAppService gameAppService;
    private final AddCurrentCardMapper addCurrentCardMapper;

    public AddCurrentCardHandler(GameAppService gameAppService, AddCurrentCardMapper addCurrentCardMapper) {
        this.gameAppService = gameAppService;
        this.addCurrentCardMapper = addCurrentCardMapper;
    }

    @Override
    public EventResponse handleEvent(String gameId, String playerId) {
        try {
            AddCurrentCardData data = addCurrentCardMapper.toDomain(gameId, playerId);
            gameAppService.addCurrentCard(data.gameId(), data.playerId());

            return new OkSuccessResponse<>(ADD_CURRENT_CARD, "Current card added successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (CardAlreadyInCurrentDeckException e) {
            return new BadRequestExceptionResponse(CARD_ALREADY_IN_CURRENT_DECK, e.getMessage());
        }
    }
}

