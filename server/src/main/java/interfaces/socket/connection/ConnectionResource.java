package interfaces.socket.connection;

import com.corundumstudio.socketio.SocketIOServer;
import domain.player.PlayerId;
import interfaces.socket.SocketResource;
import interfaces.socket.connection.joinRoom.JoinRoomHandler;
import interfaces.socket.connection.joinRoom.dto.JoinRoomRequest;

public class ConnectionResource implements SocketResource {
    private final JoinRoomHandler joinRoomHandler;

    public ConnectionResource(JoinRoomHandler joinRoomHandler) {
        this.joinRoomHandler = joinRoomHandler;
    }

    @Override
    public void setupEventListeners(SocketIOServer server) {
        server.addConnectListener(client -> {
            PlayerId playerId = new PlayerId(client.getSessionId());
            System.out.println("Socket.IO client connected: " + playerId);
        });

        server.addDisconnectListener(client -> {
            System.out.println("Socket.IO client disconnected: " + client.getSessionId());
            // Handle player leaves game or room
        });

        server.addEventListener("join-room", JoinRoomRequest.class, (client, request, ackRequest) -> {
            joinRoomHandler.handleEvent(server, client, request, ackRequest);
        });
    }
}
