package interfaces.socket;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import domain.connection.Connection;
import domain.connection.ConnectionServer;
import domain.exception.ConnectionNotFoundException;
import domain.game.Game;
import domain.player.PlayerId;
import domain.room.Room;
import interfaces.dto.responseDto.successDto.OkSuccessResponse;
import interfaces.http.game.GameStateResponse;
import interfaces.http.room.RoomStateResponse;
import interfaces.mapper.GameStateMapper;
import interfaces.mapper.RoomStateMapper;

import java.util.ArrayList;

import static interfaces.dto.responseDto.EventResponseStatus.GAME_STATE_CHANGED;
import static interfaces.dto.responseDto.EventResponseStatus.ROOM_STATE_CHANGED;

public class SocketIOConnectionServer implements ConnectionServer {
    public final SocketIOServer socketIOServer;
    private RoomStateMapper roomStateMapper;
    private GameStateMapper gameStateMapper;

    public SocketIOConnectionServer(SocketIOServer socketIOServer) {
        this.socketIOServer = socketIOServer;
    }

    @Override
    public void setup(RoomStateMapper roomStateMapper, GameStateMapper gameStateMapper) {
        this.roomStateMapper = roomStateMapper;
        this.gameStateMapper = gameStateMapper;
    }

    @Override
    public void start() {
        socketIOServer.start();
    }

    @Override
    public void stop() {
        socketIOServer.stop();
    }

    @Override
    public void joinRoom(Connection connection) {
        SocketIOClient client = socketIOServer.getClient(connection.getConnectionId().id());
        if (client == null) {
            throw new ConnectionNotFoundException(connection.getConnectionId());
        }
        client.joinRoom(connection.getGameId().toString());
    }

    @Override
    public void broadcastRoomState(Room room) {
        RoomStateResponse roomStateResponse = roomStateMapper.toDto(room);
        socketIOServer.getRoomOperations(roomStateResponse.gameId()).sendEvent("room-state-changed", new OkSuccessResponse<>(ROOM_STATE_CHANGED, roomStateResponse));
    }

    @Override
    public void broadcastRoomStateExceptPlayer(Room room, PlayerId excludedPlayerId) {
        RoomStateResponse roomStateResponse = roomStateMapper.toDto(room);

        socketIOServer.getRoomOperations(roomStateResponse.gameId())
                .getClients()
                .forEach(client -> {
                    if (client.getSessionId().toString().equals(excludedPlayerId.toString())) {
                        RoomStateResponse excludedResponse = new RoomStateResponse("", new ArrayList<>(), new ArrayList<>(), "IN_MEMORY");
                        client.sendEvent("room-state-changed", new OkSuccessResponse<>(ROOM_STATE_CHANGED, excludedResponse));
                    } else {
                        client.sendEvent("room-state-changed", new OkSuccessResponse<>(ROOM_STATE_CHANGED, roomStateResponse));
                    }
                });
    }

    @Override
    public void broadcastGameState(Game game) {
        GameStateResponse gameStateResponse = gameStateMapper.toDto(game);
        socketIOServer.getRoomOperations(gameStateResponse.id()).sendEvent("game-state-changed", new OkSuccessResponse<>(GAME_STATE_CHANGED, gameStateResponse));
    }

    @Override
    public void broadcastGameStateExceptPlayer(Game game, PlayerId excludedPlayerId) {
        GameStateResponse gameStateResponse = gameStateMapper.toDto(game);
        socketIOServer.getRoomOperations(gameStateResponse.id())
                .getClients()
                .forEach(client -> {
                    if (!client.getSessionId().toString().equals(excludedPlayerId.toString())) {
                        client.sendEvent("game-state-changed", new OkSuccessResponse<>(GAME_STATE_CHANGED, gameStateResponse));
                    }
                });
    }
}

