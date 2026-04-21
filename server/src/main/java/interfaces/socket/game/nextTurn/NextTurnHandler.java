package interfaces.socket.game.nextTurn;

import application.GameAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.game.Game;
import domain.game.currentDeck.exception.CardNotInCurrentDeckException;
import domain.game.exception.InvalidPileException;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.game.nextTurn.dto.NextTurnData;
import interfaces.socket.game.nextTurn.dto.NextTurnRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;
import static interfaces.dto.responseDto.EventResponseStatus.INVALID_PILE;

public class NextTurnHandler implements SocketEventHandler<NextTurnRequest> {
    private final GameAppService gameAppService;
    private final NextTurnMapper nextTurnMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;

    public NextTurnHandler(GameAppService gameAppService, NextTurnMapper nextTurnMapper, SocketEventBroadcaster socketEventBroadcaster) {
        this.gameAppService = gameAppService;
        this.nextTurnMapper = nextTurnMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, NextTurnRequest request, AckRequest ackRequest) {
        try {
            NextTurnData data = nextTurnMapper.toDomain(request);
            Game game = gameAppService.nextTurn(data.gameId(), data.playerId());

            socketEventBroadcaster.broadcastGameState(game, server);
        } catch (RoomNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        } catch (InvalidPileException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_PILE, e.getMessage()));
        } catch (CardNotInCurrentDeckException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(CARD_NOT_IN_CURRENT_DECK, e.getMessage()));
        }
    }
}
