package interfaces.socket;

import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;

public interface SocketEventHandler<SocketEventRequest> {
    void handleEvent(SocketIOServer server, SocketIOClient client, SocketEventRequest request, AckRequest ackRequest);
}
