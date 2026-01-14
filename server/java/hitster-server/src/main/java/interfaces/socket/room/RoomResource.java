package interfaces.socket.room;

import application.RoomAppService;
import com.corundumstudio.socketio.SocketIOServer;
import interfaces.mapper.GameStateMapper;
import interfaces.socket.SocketResource;
import interfaces.socket.room.addPlaylist.AddPlaylistHandler;
import interfaces.socket.room.changePlayerColor.ChangePlayerColorHandler;
import interfaces.socket.room.changePlayerName.ChangePlayerNameHandler;
import interfaces.socket.room.createRoom.CreateRoomHandler;
import interfaces.socket.room.joinRoom.JoinRoomHandler;
import interfaces.socket.room.removePlayer.RemovePlayerHandler;
import interfaces.socket.room.removePlaylist.RemovePlaylistHandler;
import interfaces.socket.room.startGame.StartGameHandler;
import interfaces.socket.room.startGame.dto.StartGameRequest;
import interfaces.mapper.RoomStateMapper;
import interfaces.socket.room.changePlayerColor.dto.ChangePlayerColorRequest;
import interfaces.socket.room.changePlayerName.dto.ChangePlayerNameRequest;
import interfaces.socket.room.createRoom.dto.CreateRoomRequest;
import interfaces.socket.room.joinRoom.dto.JoinRoomRequest;
import interfaces.socket.room.removePlayer.dto.RemovePlayerRequest;
import interfaces.socket.room.removePlaylist.dto.RemovePlaylistRequest;
import interfaces.socket.room.addPlaylist.dto.AddPlaylistRequest;

public class RoomResource implements SocketResource {
    private final CreateRoomHandler createRoomHandler;
    private final JoinRoomHandler joinRoomHandler;
    private final ChangePlayerNameHandler changePlayerNameHandler;
    private final ChangePlayerColorHandler changePlayerColorHandler;
    private final RemovePlayerHandler removePlayerHandler;
    private final AddPlaylistHandler addPlaylistHandler;
    private final RemovePlaylistHandler removePlaylistHandler;
    private final StartGameHandler startGameHandler;

    public RoomResource(
            CreateRoomHandler createRoomHandler,
            JoinRoomHandler joinRoomHandler,
            ChangePlayerNameHandler changePlayerNameHandler,
            ChangePlayerColorHandler changePlayerColorHandler,
            RemovePlayerHandler removePlayerHandler,
            AddPlaylistHandler addPlaylistHandler,
            RemovePlaylistHandler removePlaylistHandler,
            StartGameHandler startGameHandler) {
        this.createRoomHandler = createRoomHandler;
        this.joinRoomHandler = joinRoomHandler;
        this.changePlayerNameHandler = changePlayerNameHandler;
        this.changePlayerColorHandler = changePlayerColorHandler;
        this.removePlayerHandler = removePlayerHandler;
        this.addPlaylistHandler = addPlaylistHandler;
        this.removePlaylistHandler = removePlaylistHandler;
        this.startGameHandler = startGameHandler;
    }

    @Override
    public void setupEventListeners(SocketIOServer server) {
        server.addEventListener("create-room", CreateRoomRequest.class, (client, request, ackRequest) -> {
            createRoomHandler.handleEvent(server, client, request, ackRequest);
        });

        server.addEventListener("join-room", JoinRoomRequest.class, (client, request, ackRequest) -> {
            joinRoomHandler.handleEvent(server, client, request, ackRequest);
        });

        server.addEventListener("change-player-name", ChangePlayerNameRequest.class, (client, request, ackRequest) -> {
            changePlayerNameHandler.handleEvent(server, client, request, ackRequest);
        });

        server.addEventListener("change-player-color", ChangePlayerColorRequest.class, (client, request, ackRequest) -> {
            changePlayerColorHandler.handleEvent(server, client, request, ackRequest);
        });

        server.addEventListener("remove-player", RemovePlayerRequest.class, (client, request, ackRequest) -> {
            removePlayerHandler.handleEvent(server, client, request, ackRequest);
        });

        server.addEventListener("add-playlist", AddPlaylistRequest.class, (client, request, ackRequest) -> {
            addPlaylistHandler.handleEvent(server, client, request, ackRequest);
        });

        server.addEventListener("remove-playlist", RemovePlaylistRequest.class, (client, request, ackRequest) -> {
            removePlaylistHandler.handleEvent(server, client, request, ackRequest);
        });

        server.addEventListener("start-game", StartGameRequest.class, (client, request, ackRequest) -> {
            startGameHandler.handleEvent(server, client, request, ackRequest);
        });
    }
}
