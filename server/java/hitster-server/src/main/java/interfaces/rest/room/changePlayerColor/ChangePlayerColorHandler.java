package interfaces.rest.room.changePlayerColor;

import application.RoomAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import domain.room.exception.PlayerColorAlreadyExistsException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.rest.RestEventHandler;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;
import interfaces.rest.room.changePlayerColor.dto.ChangePlayerColorData;
import interfaces.rest.room.changePlayerColor.dto.ChangePlayerColorRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class ChangePlayerColorHandler implements RestEventHandler<ChangePlayerColorRequest> {
    private final RoomAppService roomAppService;
    private final ChangePlayerColorMapper changePlayerColorMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public ChangePlayerColorHandler(RoomAppService roomAppService, ChangePlayerColorMapper changePlayerColorMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.roomAppService = roomAppService;
        this.changePlayerColorMapper = changePlayerColorMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(ChangePlayerColorRequest request) {
        try {
            ChangePlayerColorData data = changePlayerColorMapper.toDomain(request);
            Room room = roomAppService.changePlayerColor(data.roomId(), data.playerId(), data.newColor());

            socketEventBroadcaster.broadcastRoomState(room, socketIOServerHolder.getSocketIOServer());

            return new OkSuccessResponse<>(CHANGE_PLAYER_COLOR, "Player color changed successfully");
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (PlayerColorAlreadyExistsException e) {
            return new BadRequestExceptionResponse(PLAYER_COLOR_ALREADY_EXISTS, e.getMessage());
        }
    }
}
