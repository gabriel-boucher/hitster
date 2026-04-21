package interfaces.socket.game.addCurrentCard;

import application.GameAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.game.Game;
import domain.game.currentDeck.exception.CardAlreadyInCurrentDeckException;
import domain.game.exception.InvalidPileException;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.game.addCurrentCard.dto.AddCurrentCardData;
import interfaces.socket.game.addCurrentCard.dto.AddCurrentCardRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AddCurrentCardHandler implements SocketEventHandler<AddCurrentCardRequest> {
    private final GameAppService gameAppService;
    private final AddCurrentCardMapper addCurrentCardMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;

    public AddCurrentCardHandler(GameAppService gameAppService, AddCurrentCardMapper addCurrentCardMapper, SocketEventBroadcaster socketEventBroadcaster) {
        this.gameAppService = gameAppService;
        this.addCurrentCardMapper = addCurrentCardMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, AddCurrentCardRequest request, AckRequest ackRequest) {
        try {
            AddCurrentCardData data = addCurrentCardMapper.toDomain(request);
            Game game = gameAppService.addCurrentCard(data.gameId(), data.playerId());

            socketEventBroadcaster.broadcastGameState(game, server);
        } catch (RoomNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        } catch (InvalidPileException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_PILE, e.getMessage()));
        } catch (CardAlreadyInCurrentDeckException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(CARD_ALREADY_IN_CURRENT_DECK, e.getMessage()));
        }
    }
}
