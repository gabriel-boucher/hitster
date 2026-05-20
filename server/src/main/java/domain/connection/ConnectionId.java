package domain.connection;

import java.util.UUID;

public record ConnectionId(UUID id) {
    public static ConnectionId fromString(String id) {
        return new ConnectionId(UUID.fromString(id));
    }

    @Override
    public String toString() {
        return id.toString();
    }
}

