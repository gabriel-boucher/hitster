package interfaces.http.game.nextTurn;

import application.GameAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.game.Game;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.game.nextTurn.dto.NextTurnData;
import interfaces.http.game.nextTurn.dto.NextTurnRequest;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class NextTurnHandler implements RestEventHandler<NextTurnRequest> {
    private final GameAppService gameAppService;
    private final NextTurnMapper nextTurnMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public NextTurnHandler(GameAppService gameAppService, NextTurnMapper nextTurnMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.gameAppService = gameAppService;
        this.nextTurnMapper = nextTurnMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(NextTurnRequest request) {
        try {
            NextTurnData data = nextTurnMapper.toDomain(request);
            Game game = gameAppService.nextTurn(data.gameId(), data.playerId());

            socketEventBroadcaster.broadcastGameState(game, socketIOServerHolder.getSocketIOServer());

            return new OkSuccessResponse<>(NEXT_TURN, "Turn changed successfully");
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        }
    }
}

