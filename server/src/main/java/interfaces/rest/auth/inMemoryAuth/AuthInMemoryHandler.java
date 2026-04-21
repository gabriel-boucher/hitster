package interfaces.rest.auth.inMemoryAuth;

import application.AuthAppService;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.rest.RestEventHandler;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class AuthInMemoryHandler implements RestEventHandler<AuthInMemoryRequest> {
    private final AuthAppService authAppService;
    private final AuthInMemoryMapper authInMemoryMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public AuthInMemoryHandler(AuthAppService authAppService, AuthInMemoryMapper authInMemoryMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.authAppService = authAppService;
        this.authInMemoryMapper = authInMemoryMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(AuthInMemoryRequest request) {
        try {
            AuthInMemoryData data = authInMemoryMapper.toDomain(request);
            Room room = authAppService.inMemoryAuth(data.roomId(), data.playerId());

            socketEventBroadcaster.broadcastRoomState(room, socketIOServerHolder.getSocketIOServer());

            return new OkSuccessResponse<>(IN_MEMORY_AUTH, "In-memory authorization successful");
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        }

    }
}
