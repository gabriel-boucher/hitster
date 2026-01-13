package interfaces.socket.room;

import application.RoomAppService;
import com.corundumstudio.socketio.SocketIOServer;
import domain.game.Game;
import domain.room.Room;
import interfaces.mapper.GameStateMapper;
import interfaces.socket.SocketResource;
import interfaces.socket.game.GameStateResponse;
import interfaces.socket.game.startGame.StartGameData;
import interfaces.socket.game.startGame.StartGameRequest;
import interfaces.socket.game.startGame.StartGameMapper;
import interfaces.mapper.RoomStateMapper;
import interfaces.socket.room.addPlaylist.AddPlaylistMapper;
import interfaces.socket.room.changePlayerColor.ChangePlayerColorData;
import interfaces.socket.room.changePlayerColor.ChangePlayerColorMapper;
import interfaces.socket.room.changePlayerColor.ChangePlayerColorRequest;
import interfaces.socket.room.changePlayerName.ChangePlayerNameData;
import interfaces.socket.room.changePlayerName.ChangePlayerNameMapper;
import interfaces.socket.room.changePlayerName.ChangePlayerNameRequest;
import interfaces.socket.room.createRoom.CreateRoomData;
import interfaces.socket.room.createRoom.CreateRoomMapper;
import interfaces.socket.room.createRoom.CreateRoomRequest;
import interfaces.socket.room.joinRoom.JoinRoomData;
import interfaces.socket.room.joinRoom.JoinRoomMapper;
import interfaces.socket.room.joinRoom.JoinRoomRequest;
import interfaces.socket.room.removePlayer.RemovePlayerData;
import interfaces.socket.room.removePlayer.RemovePlayerMapper;
import interfaces.socket.room.removePlayer.RemovePlayerRequest;
import interfaces.socket.room.removePlaylist.RemovePlaylistData;
import interfaces.socket.room.removePlaylist.RemovePlaylistMapper;
import interfaces.socket.room.removePlaylist.RemovePlaylistRequest;
import interfaces.socket.room.addPlaylist.AddPlaylistData;
import interfaces.socket.room.addPlaylist.AddPlaylistRequest;

import java.util.ArrayList;

public class RoomResource implements SocketResource {
    private final RoomAppService roomAppService;
    private final CreateRoomMapper createRoomMapper;
    private final JoinRoomMapper joinRoomMapper;
    private final ChangePlayerNameMapper changePlayerNameMapper;
    private final ChangePlayerColorMapper changePlayerColorMapper;
    private final RemovePlayerMapper removePlayerMapper;
    private final AddPlaylistMapper addPlaylistMapper;
    private final RemovePlaylistMapper removePlaylistMapper;
    private final StartGameMapper startGameMapper;
    private final RoomStateMapper roomStateMapper;
    private final GameStateMapper gameStateMapper;

    public RoomResource(
            RoomAppService roomAppService,
            CreateRoomMapper createRoomMapper,
            JoinRoomMapper joinRoomMapper,
            ChangePlayerNameMapper changePlayerNameMapper,
            ChangePlayerColorMapper changePlayerColorMapper,
            RemovePlayerMapper removePlayerMapper,
            AddPlaylistMapper addPlaylistMapper,
            RemovePlaylistMapper removePlaylistMapper,
            StartGameMapper startGameMapper,
            RoomStateMapper roomStateMapper,
            GameStateMapper gameStateMapper) {
        this.roomAppService = roomAppService;
        this.createRoomMapper = createRoomMapper;
        this.joinRoomMapper = joinRoomMapper;
        this.changePlayerNameMapper = changePlayerNameMapper;
        this.changePlayerColorMapper = changePlayerColorMapper;
        this.removePlayerMapper = removePlayerMapper;
        this.addPlaylistMapper = addPlaylistMapper;
        this.removePlaylistMapper = removePlaylistMapper;
        this.startGameMapper = startGameMapper;
        this.roomStateMapper = roomStateMapper;
        this.gameStateMapper = gameStateMapper;
    }

    @Override
    public void setupEventListeners(SocketIOServer server) {
        server.addEventListener("create-room", CreateRoomRequest.class, (client, request, ackSender) -> {
            CreateRoomData data = createRoomMapper.toDomain(request);
            Room room = roomAppService.createRoom(data.accessCode());
            System.out.println("Create room : RoomId = " + room.getId().toString());

            ackSender.sendAckData(room.getId().toString());
        });

        server.addEventListener("join-room", JoinRoomRequest.class, (client, request, ackSender) -> {
            JoinRoomData data = joinRoomMapper.toDomain(request);
            Room room = roomAppService.joinRoom(data.roomId(), data.playerId());
            client.joinRoom(request.roomId());
            System.out.println("Join room : PlayerId = " + request.playerId() + " in RoomId = " + request.roomId());

            broadcastRoomState(room, server);
        });

        server.addEventListener("change-player-name", ChangePlayerNameRequest.class, (client, request, ackSender) -> {
            ChangePlayerNameData data = changePlayerNameMapper.toDomain(request);
            Room room = roomAppService.changePlayerName(data.roomId(), data.playerId(), data.newName());

            broadcastRoomState(room, server);
        });

        server.addEventListener("change-player-color", ChangePlayerColorRequest.class, (client, request, ackSender) -> {
            ChangePlayerColorData data = changePlayerColorMapper.toDomain(request);
            Room room = roomAppService.changePlayerColor(data.roomId(), data.playerId(), data.newColor());

            broadcastRoomState(room, server);
        });

        server.addEventListener("remove-player", RemovePlayerRequest.class, (client, request, ackSender) -> {
            RemovePlayerData data = removePlayerMapper.toDomain(request);
            Room room = roomAppService.removePlayer(data.roomId(), data.playerId(), data.playerToRemoveId());

            broadcastRoomStateExceptPlayer(room, server, data.playerToRemoveId().toString());
        });

        server.addEventListener("add-playlist", AddPlaylistRequest.class, (client, request, ackSender) -> {
            AddPlaylistData data = addPlaylistMapper.toDomain(request);
            Room room = roomAppService.addPlaylist(data.roomId(), data.playerId(), data.playlist());

            broadcastRoomState(room, server);
        });

        server.addEventListener("remove-playlist", RemovePlaylistRequest.class, (client, request, ackSender) -> {
            RemovePlaylistData data = removePlaylistMapper.toDomain(request);
            Room room = roomAppService.removePlaylist(data.roomId(), data.playerId(), data.playlistId());

            broadcastRoomState(room, server);
        });

        server.addEventListener("start-game", StartGameRequest.class, (client, request, ackSender) -> {
            StartGameData data = startGameMapper.toDomain(request);
            Game game = roomAppService.startGame(data.roomId(), data.playerId());
            client.joinRoom(game.getId().toString());

            broadcastGameState(game, server);
        });
    }

    private void broadcastRoomState(Room room, SocketIOServer socketIOServer) {
        RoomStateResponse response = roomStateMapper.toDto(room);
        socketIOServer.getRoomOperations(room.getId().toString()).sendEvent("room-state", response);
    }

    private void broadcastRoomStateExceptPlayer(Room room, SocketIOServer socketIOServer, String excludedPlayerId) {
        RoomStateResponse response = roomStateMapper.toDto(room);
        socketIOServer.getRoomOperations(room.getId().toString())
                .getClients()
                .forEach(client -> {
                    if (client.getSessionId().toString().equals(excludedPlayerId)) {
                        RoomStateResponse excludedResponse = new RoomStateResponse("", new ArrayList<>(), new ArrayList<>());
                        client.sendEvent("room-state", excludedResponse);
                    } else {
                        client.sendEvent("room-state", response);
                    }
                });
    }

    private void broadcastGameState(Game game, SocketIOServer socketIOServer) {
        GameStateResponse response = gameStateMapper.toDto(game);
        socketIOServer.getRoomOperations(game.getId().toString()).sendEvent("game-state", response);
    }
}
