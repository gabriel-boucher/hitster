package infrastructure.connection;

import domain.connection.Connection;
import domain.connection.ConnectionId;
import domain.connection.ConnectionRepository;
import domain.game.GameId;
import domain.player.PlayerId;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class InMemoryConnectionRepository implements ConnectionRepository {
    private final Map<PlayerId, Connection> connections;

    public InMemoryConnectionRepository() {
        this.connections = new HashMap<>();
    }

    @Override
    public Optional<Connection> getConnectionByPlayerId(PlayerId playerId) {
        return Optional.ofNullable(connections.get(playerId));
    }

    @Override
    public Optional<Connection> getConnectionById(ConnectionId connectionId) {
        return connections.values().stream()
                .filter(connection -> connection.getConnectionId().equals(connectionId))
                .findFirst();
    }

    @Override
    public void saveConnection(Connection connection) {
        connections.put(connection.getPlayerId(), connection);
    }

    @Override
    public void removeConnectionByGameId(GameId gameId) {
        connections.entrySet().removeIf(entry -> entry.getValue().getGameId().equals(gameId));
    }
}
