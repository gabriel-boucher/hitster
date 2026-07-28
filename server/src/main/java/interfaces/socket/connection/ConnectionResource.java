package interfaces.socket.connection;

import com.corundumstudio.socketio.SocketIOServer;
import interfaces.socket.SocketResource;
import interfaces.socket.connection.disconnect.DisconnectHandler;

public class ConnectionResource implements SocketResource {

    private final DisconnectHandler disconnectHandler;

    public ConnectionResource(DisconnectHandler disconnectHandler) {
        this.disconnectHandler = disconnectHandler;
    }

    @Override
    public void setupEventListeners(SocketIOServer server) {
        server.addConnectListener(client -> {
            System.out.println("Socket.IO client connected: " + client.getSessionId());
        });

        server.addDisconnectListener(client -> {
            System.out.println("Socket.IO client disconnected: " + client.getSessionId());

            disconnectHandler.handleEvent(client, null, null);
        });
    }
}
