package interfaces.http.game.addCurrentCard;

import application.GameAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.game.Game;
import domain.game.currentDeck.exception.CardAlreadyInCurrentDeckException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.http.game.addCurrentCard.dto.AddCurrentCardData;
import interfaces.http.game.addCurrentCard.dto.AddCurrentCardRequest;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AddCurrentCardHandler implements RestEventHandler<AddCurrentCardRequest> {
    private final GameAppService gameAppService;
    private final AddCurrentCardMapper addCurrentCardMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public AddCurrentCardHandler(GameAppService gameAppService, AddCurrentCardMapper addCurrentCardMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.gameAppService = gameAppService;
        this.addCurrentCardMapper = addCurrentCardMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(AddCurrentCardRequest request) {
        try {
            AddCurrentCardData data = addCurrentCardMapper.toDomain(request);
            Game game = gameAppService.addCurrentCard(data.gameId(), data.playerId());

            socketEventBroadcaster.broadcastGameState(game, socketIOServerHolder.getSocketIOServer());

            return new OkSuccessResponse<>(ADD_CURRENT_CARD, "Current card added successfully");
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (CardAlreadyInCurrentDeckException e) {
            return new BadRequestExceptionResponse(CARD_ALREADY_IN_CURRENT_DECK, e.getMessage());
        }
    }
}

