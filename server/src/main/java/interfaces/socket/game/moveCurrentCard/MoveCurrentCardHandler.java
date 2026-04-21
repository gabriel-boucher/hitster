package interfaces.socket.game.moveCurrentCard;

import application.GameAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.game.Game;
import domain.game.currentDeck.exception.TokenAlreadyInPlayerDeckException;
import domain.game.exception.InvalidPileException;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.game.moveCurrentCard.dto.MoveCurrentCardData;
import interfaces.socket.game.moveCurrentCard.dto.MoveCurrentCardRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;
import static interfaces.dto.responseDto.EventResponseStatus.INVALID_PILE;

public class MoveCurrentCardHandler implements SocketEventHandler<MoveCurrentCardRequest> {
    private final GameAppService gameAppService;
    private final MoveCurrentCardMapper moveCurrentCardMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;

    public MoveCurrentCardHandler(GameAppService gameAppService, MoveCurrentCardMapper moveCurrentCardMapper, SocketEventBroadcaster socketEventBroadcaster) {
        this.gameAppService = gameAppService;
        this.moveCurrentCardMapper = moveCurrentCardMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, MoveCurrentCardRequest request, AckRequest ackRequest) {
        try {
            MoveCurrentCardData data = moveCurrentCardMapper.toDomain(request);
            Game game = gameAppService.moveCurrentCard(data.gameId(), data.playerId(), data.position());

            socketEventBroadcaster.broadcastGameState(game, server);
        } catch (RoomNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        } catch (InvalidPileException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_PILE, e.getMessage()));
        } catch (TokenAlreadyInPlayerDeckException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(TOKEN_ALREADY_IN_PLAYER_DECK, e.getMessage()));
        }
    }
}
