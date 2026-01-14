package interfaces.socket.room.changePlayerName;

import application.RoomAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import domain.room.exception.PlayerNameAlreadyExistsException;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.mapper.GameStateMapper;
import interfaces.mapper.RoomStateMapper;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.room.RoomSocketEventHandler;
import interfaces.socket.room.changePlayerName.dto.ChangePlayerNameData;
import interfaces.socket.room.changePlayerName.dto.ChangePlayerNameRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class ChangePlayerNameHandler extends RoomSocketEventHandler implements SocketEventHandler<ChangePlayerNameRequest> {
    private final ChangePlayerNameMapper changePlayerNameMapper;

    public ChangePlayerNameHandler(RoomAppService roomAppService, RoomStateMapper roomStateMapper, GameStateMapper gameStateMapper, ChangePlayerNameMapper changePlayerNameMapper) {
        super(roomAppService, roomStateMapper, gameStateMapper);
        this.changePlayerNameMapper = changePlayerNameMapper;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, ChangePlayerNameRequest request, AckRequest ackRequest) {
        try {
            System.out.println(request.toString());
            ChangePlayerNameData data = changePlayerNameMapper.toDomain(request);
            Room room = roomAppService.changePlayerName(data.roomId(), data.playerId(), data.newName());

            broadcastRoomState(room, server);
        } catch (RoomNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        } catch (PlayerNameAlreadyExistsException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(PLAYER_NAME_ALREADY_EXISTS, e.getMessage()));
        }
    }
}
