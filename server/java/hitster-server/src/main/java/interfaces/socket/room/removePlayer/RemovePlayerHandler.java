package interfaces.socket.room.removePlayer;

import application.RoomAppService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import domain.room.exception.PlayerHostCannotBeRemovedException;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.mapper.GameStateMapper;
import interfaces.mapper.RoomStateMapper;
import interfaces.socket.SocketEventHandler;
import interfaces.socket.room.RoomSocketEventHandler;
import interfaces.socket.room.removePlayer.dto.RemovePlayerData;
import interfaces.socket.room.removePlayer.dto.RemovePlayerRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class RemovePlayerHandler extends RoomSocketEventHandler implements SocketEventHandler<RemovePlayerRequest> {
    private final RemovePlayerMapper removePlayerMapper;

    public RemovePlayerHandler(RoomAppService roomAppService, RoomStateMapper roomStateMapper, GameStateMapper gameStateMapper, RemovePlayerMapper removePlayerMapper) {
        super(roomAppService, roomStateMapper, gameStateMapper);
        this.removePlayerMapper = removePlayerMapper;
    }

    @Override
    public void handleEvent(SocketIOServer server, SocketIOClient client, RemovePlayerRequest request, AckRequest ackRequest) {
        try {
            RemovePlayerData data = removePlayerMapper.toDomain(request);
            Room room = roomAppService.removePlayer(data.roomId(), data.playerId(), data.playerToRemoveId());

            broadcastRoomStateExceptPlayer(room, server, data.playerToRemoveId().toString());
        } catch (RoomNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage()));
        } catch (PlayerNotFoundException e) {
            ackRequest.sendAckData(new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage()));
        } catch (InvalidGameStatusException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage()));
        } catch (PlayerHostCannotBeRemovedException e) {
            ackRequest.sendAckData(new BadRequestExceptionResponse(PLAYER_HOST_CANNOT_BE_REMOVED, e.getMessage()));
        }
    }
}
