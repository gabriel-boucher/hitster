package interfaces.rest.room.changePlayerName;

import application.RoomAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import domain.room.exception.PlayerNameAlreadyExistsException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.rest.RestEventHandler;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;
import interfaces.rest.room.changePlayerName.dto.ChangePlayerNameData;
import interfaces.rest.room.changePlayerName.dto.ChangePlayerNameRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class ChangePlayerNameHandler implements RestEventHandler<ChangePlayerNameRequest> {
    private final RoomAppService roomAppService;
    private final ChangePlayerNameMapper changePlayerNameMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public ChangePlayerNameHandler(RoomAppService roomAppService, ChangePlayerNameMapper changePlayerNameMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.roomAppService = roomAppService;
        this.changePlayerNameMapper = changePlayerNameMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(ChangePlayerNameRequest request) {
        try {
            System.out.println(request.toString());
            ChangePlayerNameData data = changePlayerNameMapper.toDomain(request);
            Room room = roomAppService.changePlayerName(data.roomId(), data.playerId(), data.newName());

            socketEventBroadcaster.broadcastRoomState(room, socketIOServerHolder.getSocketIOServer());

            return new OkSuccessResponse<>(CHANGE_PLAYER_NAME, "Player name changed successfully");
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (PlayerNameAlreadyExistsException e) {
            return new BadRequestExceptionResponse(PLAYER_NAME_ALREADY_EXISTS, e.getMessage());
        }
    }
}
