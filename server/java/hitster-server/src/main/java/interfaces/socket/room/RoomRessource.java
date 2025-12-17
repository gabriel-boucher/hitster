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
    private SocketIOServer socketIOServer;

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

    public void initialize(SocketIOServer server) {
        this.socketIOServer = server;
        setupEventListeners();
    }

    private void setupEventListeners() {
        // Connection event
        socketIOServer.addConnectListener(client -> {
            System.out.println("Socket.IO client connected: " + client.getSessionId());
        });

        // Disconnection event
        socketIOServer.addDisconnectListener(client -> {
            System.out.println("Socket.IO client disconnected: " + client.getSessionId());
        });

        // Create room event
        socketIOServer.addEventListener("create-room", CreateRoomRequest.class, (client, request, ackSender) -> {
            try {
                System.out.println("Creating room with roomId: " + request.roomId() + " by playerId: " + request.playerId());

                CreateRoomData data = createRoomMapper.toDomain(request);
                Room room = roomAppService.createRoom(data.roomId(), data.playerId());
                RoomStateResponse response = roomStateMapper.toDto(room);

                client.sendEvent("room-state", response);
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData(response);
                }
            } catch (Exception e) {
                System.err.println("Error creating room: " + e.getMessage());
                e.printStackTrace();
                client.sendEvent("error", "{\"message\": \"" + e.getMessage() + "\"}");
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData("{\"error\": \"" + e.getMessage() + "\"}");
                }
            }
        });

        // Join room event
        socketIOServer.addEventListener("join-room", JoinRoomRequest.class, (client, request, ackSender) -> {
            try {
                System.out.println("Joining room: " + request.roomId() + " by playerId: " + request.playerId());

                JoinRoomData data = joinRoomMapper.toDomain(request);
                Room room = roomAppService.joinRoom(data.roomId(), data.playerId());
                RoomStateResponse response = roomStateMapper.toDto(room);

                // Join the Socket.IO room
                client.joinRoom(request.roomId());
                
                client.sendEvent("room-state", response);
                // Broadcast to all clients in the room
                socketIOServer.getRoomOperations(request.roomId()).sendEvent("room-state", response);
                
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData(response);
                }
            } catch (Exception e) {
                System.err.println("Error joining room: " + e.getMessage());
                e.printStackTrace();
                client.sendEvent("error", "{\"message\": \"" + e.getMessage() + "\"}");
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData("{\"error\": \"" + e.getMessage() + "\"}");
                }
            }
        });

        // Add playlist event
        socketIOServer.addEventListener("add-playlist", AddPlaylistRequest.class, (client, request, ackSender) -> {
            try {
                System.out.println("Adding playlist: " + request.playlist() + " for roomId: " + request.roomId());

                AddPlaylistData data = addPlaylistMapper.toDomain(request);
                Room room = roomAppService.addPlaylist(data.roomId(), data.playerId(), data.playlist());
                RoomStateResponse response = roomStateMapper.toDto(room);

                // Broadcast to all clients in the room
                socketIOServer.getRoomOperations(request.roomId()).sendEvent("room-state", response);
                
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData(response);
                }
            } catch (Exception e) {
                System.err.println("Error adding playlist: " + e.getMessage());
                e.printStackTrace();
                client.sendEvent("error", "{\"message\": \"" + e.getMessage() + "\"}");
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData("{\"error\": \"" + e.getMessage() + "\"}");
                }
            }
        });

        // Remove playlist event
        socketIOServer.addEventListener("remove-playlist", RemovePlaylistRequest.class, (client, request, ackSender) -> {
            try {
                System.out.println("Removing playlist: " + request.playlistId() + " for roomId: " + request.roomId());

                RemovePlaylistData data = removePlaylistMapper.toDomain(request);
                Room room = roomAppService.removePlaylist(data.roomId(), data.playerId(), data.playlistId());
                RoomStateResponse response = roomStateMapper.toDto(room);

                // Broadcast to all clients in the room
                socketIOServer.getRoomOperations(request.roomId()).sendEvent("room-state", response);
                
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData(response);
                }
            } catch (Exception e) {
                System.err.println("Error removing playlist: " + e.getMessage());
                e.printStackTrace();
                client.sendEvent("error", "{\"message\": \"" + e.getMessage() + "\"}");
                if (ackSender.isAckRequested()) {
                    ackSender.sendAckData("{\"error\": \"" + e.getMessage() + "\"}");
                }
            }
        });
    }
}
