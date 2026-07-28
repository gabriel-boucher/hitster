package interfaces.socket.connection.disconnect.dto;

import domain.connection.ConnectionId;

public record DisconnectData(
        ConnectionId connectionId
) {
}
