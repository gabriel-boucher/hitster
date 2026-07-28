package infrastructure.connection;

import domain.connection.Connection;
import domain.connection.ConnectionId;
import domain.connection.ConnectionRepository;
import domain.game.GameId;
import domain.player.PlayerId;

import java.util.*;

public class InMemoryConnectionRepository implements ConnectionRepository {
    private final Map<PlayerId, List<Connection>> connections;

    public InMemoryConnectionRepository() {
        this.connections = new HashMap<>();
    }


    @Override
    public Optional<Connection> getConnectionById(ConnectionId connectionId) {
        return connections.values()
                .stream()
                .flatMap(List::stream)
                .filter(connection -> connection.getConnectionId().equals(connectionId))
                .findFirst();
    }

    @Override
    public List<Connection> getConnectionsByPlayerIdAndGameId(PlayerId playerId, GameId gameId) {
        return connections.getOrDefault(playerId, Collections.emptyList())
                .stream()
                .filter(connection -> connection.getGameId().equals(gameId))
                .toList();
    }

    @Override
    public void addConnection(Connection connection) {
        connections.computeIfAbsent(connection.getPlayerId(), k -> new ArrayList<>()).add(connection);
    }

    @Override
    public void removeConnection(Connection connection) {
        connections.computeIfAbsent(connection.getPlayerId(), k -> new ArrayList<>()).remove(connection);
    }
}
