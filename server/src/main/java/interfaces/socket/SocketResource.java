package interfaces.socket;

import com.corundumstudio.socketio.SocketIOServer;

public interface SocketResource {
    void setupEventListeners(SocketIOServer server);
}
