package interfaces.http.game.removeToken;

import application.GameAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.game.Game;
import domain.game.currentDeck.exception.TokenAlreadyInPlayerDeckException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.game.removeToken.dto.RemoveTokenData;
import interfaces.http.game.removeToken.dto.RemoveTokenRequest;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class RemoveTokenHandler implements RestEventHandler<RemoveTokenRequest> {
    private final GameAppService gameAppService;
    private final RemoveTokenMapper removeTokenMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public RemoveTokenHandler(GameAppService gameAppService, RemoveTokenMapper removeTokenMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.gameAppService = gameAppService;
        this.removeTokenMapper = removeTokenMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(RemoveTokenRequest request) {
        try {
            RemoveTokenData data = removeTokenMapper.toDomain(request);
            Game game = gameAppService.removeToken(data.gameId(), data.playerId(), data.tokenId());

            socketEventBroadcaster.broadcastGameStateExceptPlayer(game, socketIOServerHolder.getSocketIOServer(), data.playerId().toString());

            return new OkSuccessResponse<>(REMOVE_TOKEN, "Token removed successfully");
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (TokenAlreadyInPlayerDeckException e) {
            return new BadRequestExceptionResponse(TOKEN_ALREADY_IN_PLAYER_DECK, e.getMessage());
        }
    }
}

