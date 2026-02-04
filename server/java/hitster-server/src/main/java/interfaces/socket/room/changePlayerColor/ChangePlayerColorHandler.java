package interfaces.socket.room.changePlayerColor;

import application.RoomAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import domain.room.exception.PlayerColorAlreadyExistsException;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.room.changePlayerColor.dto.ChangePlayerColorData;
import interfaces.socket.room.changePlayerColor.dto.ChangePlayerColorRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class ChangePlayerColorHandler implements SocketEventHandler<ChangePlayerColorRequest> {
    private final RoomAppService roomAppService;
    private final ChangePlayerColorMapper changePlayerColorMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;

    public ChangePlayerColorHandler(RoomAppService roomAppService, ChangePlayerColorMapper changePlayerColorMapper, SocketEventBroadcaster socketEventBroadcaster) {
        this.roomAppService = roomAppService;
        this.changePlayerColorMapper = changePlayerColorMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, ChangePlayerColorRequest request, AckRequest ackRequest) {
        try {
            ChangePlayerColorData data = changePlayerColorMapper.toDomain(request);
            Room room = roomAppService.changePlayerColor(data.roomId(), data.playerId(), data.newColor());

            socketEventBroadcaster.broadcastRoomState(room, server);
        } catch (RoomNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        } catch (PlayerColorAlreadyExistsException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(PLAYER_COLOR_ALREADY_EXISTS, e.getMessage()));
        }
    }
}
