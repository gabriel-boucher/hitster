package interfaces.rest.room.removePlayer;

import application.RoomAppService;
import domain.exception.InvalidGameStatusException;
import domain.exception.PlayerNotFoundException;
import domain.exception.RoomNotFoundException;
import domain.room.Room;
import domain.room.exception.PlayerHostCannotBeRemovedException;
import interfaces.dto.responseDto.EventResponse;
import interfaces.dto.responseDto.exceptionDto.BadRequestExceptionResponse;
import interfaces.dto.responseDto.exceptionDto.NotFoundExceptionResponse;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.rest.RestEventHandler;
import interfaces.socket.SocketEventBroadcaster;
import interfaces.socket.SocketIOServerHolder;
import interfaces.rest.room.removePlayer.dto.RemovePlayerData;
import interfaces.rest.room.removePlayer.dto.RemovePlayerRequest;

import static interfaces.dto.responseDto.EventResponseStatus.*;

public class RemovePlayerHandler implements RestEventHandler<RemovePlayerRequest> {
    private final RoomAppService roomAppService;
    private final RemovePlayerMapper removePlayerMapper;
    private final SocketEventBroadcaster socketEventBroadcaster;
    private final SocketIOServerHolder socketIOServerHolder;

    public RemovePlayerHandler(RoomAppService roomAppService, RemovePlayerMapper removePlayerMapper, SocketEventBroadcaster socketEventBroadcaster, SocketIOServerHolder socketIOServerHolder) {
        this.roomAppService = roomAppService;
        this.removePlayerMapper = removePlayerMapper;
        this.socketEventBroadcaster = socketEventBroadcaster;
        this.socketIOServerHolder = socketIOServerHolder;
    }

    @Override
    public EventResponse handleEvent(RemovePlayerRequest request) {
        try {
            RemovePlayerData data = removePlayerMapper.toDomain(request);
            Room room = roomAppService.removePlayer(data.roomId(), data.playerId(), data.playerToRemoveId());

            socketEventBroadcaster.broadcastRoomStateExceptPlayer(room, socketIOServerHolder.getSocketIOServer(), data.playerToRemoveId().toString());

            return new OkSuccessResponse<>(REMOVE_PLAYER, "Player removed successfully");
        } catch (RoomNotFoundException e) {
            return new NotFoundExceptionResponse(ROOM_NOT_FOUND, e.getMessage());
        } catch (PlayerNotFoundException e) {
            return new NotFoundExceptionResponse(PLAYER_NOT_FOUND, e.getMessage());
        } catch (InvalidGameStatusException e) {
            return new BadRequestExceptionResponse(INVALID_GAME_STATUS, e.getMessage());
        } catch (PlayerHostCannotBeRemovedException e) {
            return new BadRequestExceptionResponse(PLAYER_HOST_CANNOT_BE_REMOVED, e.getMessage());
        }
    }
}
