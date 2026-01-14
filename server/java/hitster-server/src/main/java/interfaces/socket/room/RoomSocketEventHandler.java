package interfaces.socket.room;

import application.RoomAppService;
import com.corundumstudio.socketio.SocketIOServer;
import domain.game.Game;
import domain.room.Room;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.mapper.GameStateMapper;
import interfaces.mapper.RoomStateMapper;
import interfaces.socket.game.GameStateResponse;

import java.util.ArrayList;

import static interfaces.dto.responseDto.EventResponseStatus.ROOM_STATE;

public abstract class RoomSocketEventHandler {
    protected final RoomAppService roomAppService;
    private final RoomStateMapper roomStateMapper;
    private final GameStateMapper gameStateMapper;

    public RoomSocketEventHandler(RoomAppService roomAppService, RoomStateMapper roomStateMapper, GameStateMapper gameStateMapper) {
        this.roomAppService = roomAppService;
        this.roomStateMapper = roomStateMapper;
        this.gameStateMapper = gameStateMapper;
    }

    protected void broadcastRoomState(Room room, SocketIOServer socketIOServer) {
        RoomStateResponse response = roomStateMapper.toDto(room);
        socketIOServer.getRoomOperations(room.getId().toString()).sendEvent("room-state", new OkSuccessResponse<>(ROOM_STATE, response));
    }

    protected void broadcastRoomStateExceptPlayer(Room room, SocketIOServer socketIOServer, String excludedPlayerId) {
        RoomStateResponse response = roomStateMapper.toDto(room);
        socketIOServer.getRoomOperations(room.getId().toString())
                .getClients()
                .forEach(client -> {
                    if (client.getSessionId().toString().equals(excludedPlayerId)) {
                        RoomStateResponse excludedResponse = new RoomStateResponse("", new ArrayList<>(), new ArrayList<>());
                        client.sendEvent("room-state", new OkSuccessResponse<>(ROOM_STATE, excludedResponse));
                    } else {
                        client.sendEvent("room-state", new OkSuccessResponse<>(ROOM_STATE, response));
                    }
                });
    }

    protected void broadcastGameState(Game game, SocketIOServer socketIOServer) {
        GameStateResponse response = gameStateMapper.toDto(game);
        socketIOServer.getRoomOperations(game.getId().toString()).sendEvent("game-state", response);
    }
}
