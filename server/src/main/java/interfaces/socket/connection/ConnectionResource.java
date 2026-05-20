package interfaces.socket.connection;

import com.corundumstudio.socketio.SocketIOServer;
import interfaces.socket.SocketResource;

public class ConnectionResource implements SocketResource {
    @Override
    public void setupEventListeners(SocketIOServer server) {
        server.addConnectListener(client -> {
            System.out.println("Socket.IO client connected: " + client.getSessionId());
        });

        server.addDisconnectListener(client -> {
            System.out.println("Socket.IO client disconnected: " + client.getSessionId());
        });
    }
}
