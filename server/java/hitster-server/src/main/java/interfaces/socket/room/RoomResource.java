package interfaces.socket.room;

import application.RoomAppService;
import com.corundumstudio.socketio.SocketIOServer;
import domain.game.Game;
import domain.room.Room;
import interfaces.mapper.GameStateMapper;
import interfaces.socket.SocketResource;
import interfaces.socket.game.dto.GameStateResponse;
import interfaces.socket.game.dto.startGame.StartGameData;
import interfaces.socket.game.dto.startGame.StartGameRequest;
import interfaces.socket.game.mapper.StartGameMapper;
import interfaces.socket.room.dto.RoomStateResponse;
import interfaces.mapper.RoomStateMapper;
import interfaces.socket.room.dto.changePlayerColor.ChangePlayerColorData;
import interfaces.socket.room.dto.changePlayerColor.ChangePlayerColorRequest;
import interfaces.socket.room.dto.changePlayerName.ChangePlayerNameData;
import interfaces.socket.room.dto.changePlayerName.ChangePlayerNameRequest;
import interfaces.socket.room.dto.joinRoom.JoinRoomData;
import interfaces.socket.room.dto.joinRoom.JoinRoomRequest;
import interfaces.socket.room.dto.removePlayer.RemovePlayerData;
import interfaces.socket.room.dto.removePlayer.RemovePlayerRequest;
import interfaces.socket.room.dto.removePlaylist.RemovePlaylistData;
import interfaces.socket.room.dto.removePlaylist.RemovePlaylistRequest;
import interfaces.socket.room.mapper.*;
import interfaces.socket.room.dto.addPlaylist.AddPlaylistData;
import interfaces.socket.room.dto.addPlaylist.AddPlaylistRequest;

public class RoomResource implements SocketResource {
    private final RoomAppService roomAppService;
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
        server.addEventListener("create-room", Object.class, (client, request, ackSender) -> {
            Room room = roomAppService.createRoom();
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

            broadcastRoomState(room, server);
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

    private void broadcastGameState(Game game, SocketIOServer socketIOServer) {
        GameStateResponse response = gameStateMapper.toDto(game);
        socketIOServer.getRoomOperations(game.getId().toString()).sendEvent("game-state", response);
    }
}
