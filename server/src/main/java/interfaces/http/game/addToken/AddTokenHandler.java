package interfaces.http.game.addToken;

import application.GameAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.game.Game;
import domain.game.currentDeck.exception.TokenAlreadyInCurrentDeckException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.game.addToken.dto.AddTokenData;
import interfaces.http.game.addToken.dto.AddTokenRequest;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AddTokenHandler implements RestEventHandler<AddTokenRequest> {
    private final GameAppService gameAppService;
    private final AddTokenMapper addTokenMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public AddTokenHandler(GameAppService gameAppService, AddTokenMapper addTokenMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.gameAppService = gameAppService;
        this.addTokenMapper = addTokenMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(AddTokenRequest request) {
        try {
            AddTokenData data = addTokenMapper.toDomain(request);
            Game game = gameAppService.addToken(data.gameId(), data.playerId(), data.tokenId(), data.position());

            socketEventBroadcaster.broadcastGameState(game, socketIOServerHolder.getSocketIOServer());

            return new OkSuccessResponse<>(ADD_TOKEN, "Token added successfully");
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (TokenAlreadyInCurrentDeckException e) {
            return new BadRequestExceptionResponse(TOKEN_ALREADY_IN_CURRENT_DECK, e.getMessage());
        }
    }
}

