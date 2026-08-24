package interfaces.socket.connection.disconnect;

import com.corundumstudio.socketio.SocketIOClient;
import domain.connection.ConnectionId;
import interfaces.socket.connection.disconnect.dto.DisconnectData;
import interfaces.socket.connection.disconnect.dto.DisconnectRequest;

public class DisconnectMapper {
    public DisconnectData toDomain(SocketIOClient client) {
        return new DisconnectData(
            ConnectionId.fromString(client.getSessionId().toString())
        );
    }
}
