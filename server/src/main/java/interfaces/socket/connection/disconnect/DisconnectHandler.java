package interfaces.socket.connection.disconnect;

import application.RoomAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import domain.exception.ConnectionNotFoundException;
import domain.exception.GameNotFoundException;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.connection.disconnect.dto.DisconnectData;
import interfaces.socket.connection.disconnect.dto.DisconnectRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class DisconnectHandler implements SocketEventHandler<DisconnectRequest> {
    private final RoomAppService roomAppService;
    private final DisconnectMapper disconnectMapper;

    public DisconnectHandler(RoomAppService roomAppService, DisconnectMapper disconnectMapper) {
        this.roomAppService = roomAppService;
        this.disconnectMapper = disconnectMapper;
    }

    @Override
    public void handleEvent(SocketIOClient client, DisconnectRequest request, AckRequest ackRequest) {
        try {
            DisconnectData data = disconnectMapper.toDomain(client);
            roomAppService.leaveGame(data.connectionId());

            if (ackRequest == null) return;
            ackRequest.sendAckData(new OkSuccessResponse<>(LEAVE_ROOM, data.connectionId().id()));
        } catch (GameNotFoundException | IllegalArgumentException e) {
            if (ackRequest == null) return;
            ackRequest.sendAckData(new NotFoundExceptionResponse(GAME_NOT_FOUND, e.getMessage()));
        } catch (ConnectionNotFoundException e) {
            if (ackRequest == null) return;
            ackRequest.sendAckData(new NotFoundExceptionResponse(CONNECTION_NOT_FOUND, e.getMessage()));
        }
    }
}
