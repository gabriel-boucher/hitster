package interfaces.socket.game.returnCurrentCard;

import application.GameAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.game.Game;
import domain.game.currentDeck.exception.CardAlreadyInPileException;
import domain.game.exception.InvalidPileException;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.game.returnCurrentCard.dto.ReturnCurrentCardData;
import interfaces.socket.game.returnCurrentCard.dto.ReturnCurrentCardRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;
import static interfaces.dto.responseDto.EventResponseStatus.INVALID_PILE;

public class ReturnCurrentCardHandler implements SocketEventHandler<ReturnCurrentCardRequest> {
    private final GameAppService gameAppService;
    private final ReturnCurrentCardMapper returnCurrentCardMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;

    public ReturnCurrentCardHandler(GameAppService gameAppService, ReturnCurrentCardMapper returnCurrentCardMapper, SocketEventBroadcaster socketEventBroadcaster) {
        this.gameAppService = gameAppService;
        this.returnCurrentCardMapper = returnCurrentCardMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, ReturnCurrentCardRequest request, AckRequest ackRequest) {
        try {
            ReturnCurrentCardData data = returnCurrentCardMapper.toDomain(request);
            Game game = gameAppService.returnCurrentCard(data.gameId(), data.playerId());

            socketEventBroadcaster.broadcastGameState(game, server);
        } catch (RoomNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        } catch (InvalidPileException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_PILE, e.getMessage()));
        } catch (CardAlreadyInPileException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(CARD_ALREADY_IN_PILE, e.getMessage()));
        }
    }
}
