package interfaces.socket.game.addToken;

import application.GameAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.game.Game;
import domain.game.currentDeck.exception.TokenAlreadyInCurrentDeckException;
import domain.game.exception.InvalidPlayerIdForTokenId;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.game.addToken.dto.AddTokenData;
import interfaces.socket.game.addToken.dto.AddTokenRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AddTokenHandler implements SocketEventHandler<AddTokenRequest> {
    private final GameAppService gameAppService;
    private final AddTokenMapper addTokenMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;

    public AddTokenHandler(GameAppService gameAppService, AddTokenMapper addTokenMapper, SocketEventBroadcaster socketEventBroadcaster) {
        this.gameAppService = gameAppService;
        this.addTokenMapper = addTokenMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, AddTokenRequest request, AckRequest ackRequest) {
        try {
            AddTokenData data = addTokenMapper.toDomain(request);
            Game game = gameAppService.addToken(data.gameId(), data.playerId(), data.tokenId(), data.position());

            socketEventBroadcaster.broadcastGameState(game, server);
        } catch (RoomNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage()));
        } catch (InvalidPlayerIdForTokenId e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_PLAYER_ID_FOR_TOKEN_ID, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        } catch (TokenAlreadyInCurrentDeckException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(TOKEN_ALREADY_IN_CURRENT_DECK, e.getMessage()));
        }
    }
}
