package interfaces.http.game.nextTurn;

import application.GameAppService;
import domain.exception.GameNotFoundException;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.game.nextTurn.dto.NextTurnData;
import interfaces.http.game.nextTurn.dto.NextTurnRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class NextTurnHandler implements RestEventHandler<NextTurnRequest> {
    private final GameAppService gameAppService;
    private final NextTurnMapper nextTurnMapper;

    public NextTurnHandler(GameAppService gameAppService, NextTurnMapper nextTurnMapper) {
        this.gameAppService = gameAppService;
        this.nextTurnMapper = nextTurnMapper;
    }

    @Override
    public EventResponse handleEvent(NextTurnRequest request) {
        try {
            NextTurnData data = nextTurnMapper.toDomain(request);
            gameAppService.nextTurn(data.gameId(), data.playerId());

            return new OkSuccessResponse<>(NEXT_TURN, "Turn changed successfully");
        } catch (GameNotFoundException e) {
            return new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        }
    }
}

