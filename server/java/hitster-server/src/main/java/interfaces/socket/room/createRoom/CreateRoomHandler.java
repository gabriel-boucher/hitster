package interfaces.socket.room.createRoom;

import application.RoomAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.room.Room;
import infrastructure.accessToken.exception.AccessTokenException;
import interfaces.dto.responseDto.exceptionDto.UnauthorizedExceptionResponse;
import interfaces.dto.responseDto.successDto.CreatedSuccessResponse;
import interfaces.mapper.GameStateMapper;
import interfaces.mapper.RoomStateMapper;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.room.RoomSocketEventHandler;
import interfaces.socket.room.createRoom.dto.CreateRoomData;
import interfaces.socket.room.createRoom.dto.CreateRoomRequest;
import interfaces.socket.room.createRoom.dto.CreateRoomResponse;

import static interfaces.dto.responseDto.EventResponseStatus.ROOM_ID;
import static interfaces.dto.responseDto.EventResponseStatus.UNAUTHORIZED_ACCESS_TOKEN;

public class CreateRoomHandler extends RoomSocketEventHandler implements SocketEventHandler<CreateRoomRequest> {
    private final CreateRoomMapper createRoomMapper;

    public CreateRoomHandler(RoomAppService roomAppService, RoomStateMapper roomStateMapper, GameStateMapper gameStateMapper, CreateRoomMapper createRoomMapper) {
        super(roomAppService, roomStateMapper, gameStateMapper);
        this.createRoomMapper = createRoomMapper;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, CreateRoomRequest request, AckRequest ackRequest) {
        try {
            CreateRoomData data = createRoomMapper.toDomain(request);
            Room room = roomAppService.createRoom(data.accessCode());
            System.out.println("Create room : RoomId = " + room.getId().toString());

            ackRequest.sendAckData(new CreatedSuccessResponse<>(ROOM_ID, new CreateRoomResponse(room.getId().toString())));
        } catch (AccessTokenException e) {
            ackRequest.sendAckData(new UnauthorizedExceptionResponse(UNAUTHORIZED_ACCESS_TOKEN, e.getMessage()));
        }
    }
}
