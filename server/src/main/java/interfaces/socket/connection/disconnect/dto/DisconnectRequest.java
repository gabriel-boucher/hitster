package interfaces.socket.connection.disconnect.dto;

import java.util.UUID;

public record DisconnectRequest(
        UUID connectionId
) {
}
