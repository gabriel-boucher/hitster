package interfaces.http.room.joinRoom;

import application.RoomAppService;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import domain.room.exception.PlayerAlreadyInRoomException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.RestEventHandler;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;
import interfaces.http.room.joinRoom.dto.JoinRoomData;
import interfaces.http.room.joinRoom.dto.JoinRoomRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class JoinRoomHandler implements RestEventHandler<JoinRoomRequest> {
    private final RoomAppService roomAppService;
    private final JoinRoomMapper joinRoomMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public JoinRoomHandler(RoomAppService roomAppService, JoinRoomMapper joinRoomMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.roomAppService = roomAppService;
        this.joinRoomMapper = joinRoomMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(JoinRoomRequest request) {
        try {
            JoinRoomData data = joinRoomMapper.toDomain(request);
            Room room = roomAppService.joinRoom(data.roomId(), data.playerId());
            SocketIOServer server = socketIOServerHolder.getSocketIOServer();
            SocketIOClient client = server.getClient(data.playerId().id());
            if (client == null) {
                throw new PlayerNotFoundException(data.playerId());
            }
            client.joinRoom(request.roomId());
            socketEventBroadcaster.broadcastRoomState(room, server);

            return new OkSuccessResponse<>(JOIN_ROOM, "Joined room successfully");
        } catch (RoomNotFoundException | IllegalArgumentException e) { // room not found | uuid mapper
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (PlayerAlreadyInRoomException e) {
            return new BadRequestExceptionResponse(PLAYER_ALREADY_IN_ROOM, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        }
    }
}