package interfaces.socket.room;

import application.RoomAppService;
import com.corundumstudio.socketio.SocketIOServer;
import domain.room.Room;
import interfaces.socket.room.dto.RoomStateResponse;
import interfaces.mapper.RoomStateMapper;
import interfaces.socket.room.dto.createRoom.CreateRoomData;
import interfaces.socket.room.dto.createRoom.CreateRoomRequest;
import interfaces.socket.room.dto.joinRoom.JoinRoomData;
import interfaces.socket.room.dto.joinRoom.JoinRoomRequest;
import interfaces.socket.room.dto.removePlaylist.RemovePlaylistData;
import interfaces.socket.room.dto.removePlaylist.RemovePlaylistRequest;
import interfaces.socket.room.mapper.CreateRoomMapper;
import interfaces.socket.room.mapper.JoinRoomMapper;
import interfaces.socket.room.mapper.AddPlaylistMapper;
import interfaces.socket.room.dto.addPlaylist.AddPlaylistData;
import interfaces.socket.room.dto.addPlaylist.AddPlaylistRequest;
import interfaces.socket.room.mapper.RemovePlaylistMapper;

public class RoomRessource {
    private final RoomAppService roomAppService;
    private final CreateRoomMapper createRoomMapper;
    private final JoinRoomMapper joinRoomMapper;
    private final AddPlaylistMapper addPlaylistMapper;
    private final RemovePlaylistMapper removePlaylistMapper;
    private final RoomStateMapper roomStateMapper;

    public RoomRessource(
            RoomAppService roomAppService,
            CreateRoomMapper createRoomMapper,
            JoinRoomMapper joinRoomMapper,
            AddPlaylistMapper addPlaylistMapper,
            RemovePlaylistMapper removePlaylistMapper,
            RoomStateMapper roomStateMapper) {
        this.roomAppService = roomAppService;
        this.createRoomMapper = createRoomMapper;
        this.joinRoomMapper = joinRoomMapper;
        this.addPlaylistMapper = addPlaylistMapper;
        this.removePlaylistMapper = removePlaylistMapper;
        this.roomStateMapper = roomStateMapper;
    }

    public void setupEventListeners(SocketIOServer socketIOServer) {
        socketIOServer.addConnectListener(client -> System.out.println("Socket.IO client connected: " + client.getSessionId()));

        socketIOServer.addDisconnectListener(client -> System.out.println("Socket.IO client disconnected: " + client.getSessionId()));

        socketIOServer.addEventListener("create-room", CreateRoomRequest.class, (client, request, ackSender) -> {
            CreateRoomData data = createRoomMapper.toDomain(request);
            Room room = roomAppService.createRoom(data.playerId());
            client.joinRoom(room.getId().toString());

            broadcastRoomState(room, socketIOServer);
        });

        socketIOServer.addEventListener("join-room", JoinRoomRequest.class, (client, request, ackSender) -> {
            JoinRoomData data = joinRoomMapper.toDomain(request);
            Room room = roomAppService.joinRoom(data.roomId(), data.playerId());
            client.joinRoom(request.roomId());

            broadcastRoomState(room, socketIOServer);
        });

        socketIOServer.addEventListener("add-playlist", AddPlaylistRequest.class, (client, request, ackSender) -> {
            AddPlaylistData data = addPlaylistMapper.toDomain(request);
            Room room = roomAppService.addPlaylist(data.roomId(), data.playerId(), data.playlist());

            broadcastRoomState(room, socketIOServer);
        });

        socketIOServer.addEventListener("remove-playlist", RemovePlaylistRequest.class, (client, request, ackSender) -> {
            RemovePlaylistData data = removePlaylistMapper.toDomain(request);
            Room room = roomAppService.removePlaylist(data.roomId(), data.playerId(), data.playlistId());

            broadcastRoomState(room, socketIOServer);
        });
    }

    private void broadcastRoomState(Room room, SocketIOServer socketIOServer) {
        RoomStateResponse response = roomStateMapper.toDto(room);
        socketIOServer.getRoomOperations(room.getId().toString()).sendEvent("room-state", response);
    }
}
