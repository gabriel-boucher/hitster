package interfaces.socket.connection;

import com.corundumstudio.socketio.SocketIOServer;
import domain.player.PlayerId;
import interfaces.socket.SocketResource;

public class ConnectionResource implements SocketResource {
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
    }
}
