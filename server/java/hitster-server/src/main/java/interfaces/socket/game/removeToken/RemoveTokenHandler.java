package interfaces.socket.game.removeToken;

import application.GameAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.game.Game;
import domain.game.currentDeck.exception.TokenAlreadyInPlayerDeckException;
import domain.game.exception.InvalidPlayerIdForTokenId;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.game.removeToken.dto.RemoveTokenData;
import interfaces.socket.game.removeToken.dto.RemoveTokenRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class RemoveTokenHandler implements SocketEventHandler<RemoveTokenRequest> {
    private final GameAppService gameAppService;
    private final RemoveTokenMapper removeTokenMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;

    public RemoveTokenHandler(GameAppService gameAppService, RemoveTokenMapper removeTokenMapper, SocketEventBroadcaster socketEventBroadcaster) {
        this.gameAppService = gameAppService;
        this.removeTokenMapper = removeTokenMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, RemoveTokenRequest request, AckRequest ackRequest) {
        try {
            RemoveTokenData data = removeTokenMapper.toDomain(request);
            Game game = gameAppService.removeToken(data.gameId(), data.playerId(), data.tokenId());

            socketEventBroadcaster.broadcastGameStateExceptPlayer(game, server, data.playerId().toString());
        } catch (RoomNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage()));
        } catch (InvalidPlayerIdForTokenId e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_PLAYER_ID_FOR_TOKEN_ID, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        } catch (TokenAlreadyInPlayerDeckException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(TOKEN_ALREADY_IN_PLAYER_DECK, e.getMessage()));
        }
    }
}
