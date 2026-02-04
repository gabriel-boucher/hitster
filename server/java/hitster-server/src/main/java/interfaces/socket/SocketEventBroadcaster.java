package interfaces.socket;

import application.RoomAppService;
import com.corundumstudio.socketio.SocketIOServer;
import domain.game.Game;
import domain.room.Room;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.mapper.GameStateMapper;
import interfaces.mapper.RoomStateMapper;
import interfaces.socket.game.GameStateResponse;
import interfaces.socket.room.RoomStateResponse;

import java.util.ArrayList;

import static interfaces.dto.responseDto.EventResponseStatus.GAME_STATE;
import static interfaces.dto.responseDto.EventResponseStatus.ROOM_STATE;

public class SocketEventBroadcaster {
    private final RoomStateMapper roomStateMapper;
    private final GameStateMapper gameStateMapper;

    public SocketEventBroadcaster(RoomStateMapper roomStateMapper, GameStateMapper gameStateMapper) {
        this.roomStateMapper = roomStateMapper;
        this.gameStateMapper = gameStateMapper;
    }

    public void broadcastRoomState(Room room, SocketIOServer socketIOServer) {
        RoomStateResponse response = roomStateMapper.toDto(room);
        socketIOServer.getRoomOperations(room.getId().toString()).sendEvent("room-state", new OkSuccessResponse<>(ROOM_STATE, response));
    }

    public void broadcastRoomStateExceptPlayer(Room room, SocketIOServer socketIOServer, String excludedPlayerId) {
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

    public void broadcastGameState(Game game, SocketIOServer socketIOServer) {
        GameStateResponse response = gameStateMapper.toDto(game);
        socketIOServer.getRoomOperations(game.getId().toString()).sendEvent("game-state", new OkSuccessResponse<>(GAME_STATE, response));
    }

    public void broadcastGameStateExceptPlayer(Game game, SocketIOServer socketIOServer, String excludedPlayerId) {
        GameStateResponse response = gameStateMapper.toDto(game);
        socketIOServer.getRoomOperations(game.getId().toString())
                .getClients()
                .forEach(client -> {
                    if (!client.getSessionId().toString().equals(excludedPlayerId)) {
                        client.sendEvent("game-state", new OkSuccessResponse<>(GAME_STATE, response));
                    }
                });
    }
}
