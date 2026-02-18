package interfaces.socket;

import com.corundumstudio.socketio.SocketIOServer;

public class SocketIOServerHolder {
    private SocketIOServer socketIOServer;

    public void setSocketIOServer(SocketIOServer socketIOServer) {
        this.socketIOServer = socketIOServer;
    }

    public SocketIOServer getSocketIOServer() {
        return socketIOServer;
    }
}

