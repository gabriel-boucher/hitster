package interfaces.http.game.moveCurrentCard;

import application.GameAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.GameNotFoundException;
import domain.game.currentDeck.exception.TokenAlreadyInPlayerDeckException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.game.moveCurrentCard.dto.MoveCurrentCardData;
import interfaces.http.game.moveCurrentCard.dto.MoveCurrentCardRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class MoveCurrentCardHandler implements RestEventHandler<MoveCurrentCardRequest> {
    private final GameAppService gameAppService;
    private final MoveCurrentCardMapper moveCurrentCardMapper;

    public MoveCurrentCardHandler(GameAppService gameAppService, MoveCurrentCardMapper moveCurrentCardMapper) {
        this.gameAppService = gameAppService;
        this.moveCurrentCardMapper = moveCurrentCardMapper;
    }

    @Override
    public EventResponse handleEvent(MoveCurrentCardRequest request) {
        try {
            MoveCurrentCardData data = moveCurrentCardMapper.toDomain(request);
            gameAppService.moveCurrentCard(data.gameId(), data.playerId(), data.position());

            return new OkSuccessResponse<>(MOVE_CURRENT_CARD, "Current card moved successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (TokenAlreadyInPlayerDeckException e) {
            return new BadRequestExceptionResponse(TOKEN_ALREADY_IN_PLAYER_DECK, e.getMessage());
        }
    }
}

