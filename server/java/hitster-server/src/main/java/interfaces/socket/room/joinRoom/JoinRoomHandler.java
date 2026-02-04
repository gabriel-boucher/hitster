package interfaces.socket.room.joinRoom;

import application.RoomAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import domain.room.exception.PlayerAlreadyInRoomException;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.room.joinRoom.dto.JoinRoomData;
import interfaces.socket.room.joinRoom.dto.JoinRoomRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class JoinRoomHandler implements SocketEventHandler<JoinRoomRequest> {
    private final RoomAppService roomAppService;
    private final JoinRoomMapper joinRoomMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;

    public JoinRoomHandler(RoomAppService roomAppService, JoinRoomMapper joinRoomMapper, SocketEventBroadcaster socketEventBroadcaster) {
        this.roomAppService = roomAppService;
        this.joinRoomMapper = joinRoomMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, JoinRoomRequest request, AckRequest ackRequest) {
        try {
            JoinRoomData data = joinRoomMapper.toDomain(request);
            Room room = roomAppService.joinRoom(data.roomId(), data.playerId());
            client.joinRoom(request.roomId());
            System.out.println("Join room : PlayerId = " + request.playerId() + " in RoomId = " + request.roomId());

            socketEventBroadcaster.broadcastRoomState(room, server);
        } catch (RoomNotFoundException | IllegalArgumentException e) { // room not found | uuid mapper
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerAlreadyInRoomException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(PLAYER_ALREADY_IN_ROOM, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        }
    }
}
