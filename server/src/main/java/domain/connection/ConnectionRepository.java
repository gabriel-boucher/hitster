package domain.connection;

import domain.game.GameId;
import domain.player.PlayerId;

import java.util.List;
import java.util.Optional;

public interface ConnectionRepository {
    Optional<Connection> getConnectionById(ConnectionId connectionId);
    List<Connection> getConnectionsByPlayerIdAndGameId(PlayerId playerId, GameId gameId);
    void addConnection(Connection connection);
    void removeConnection(Connection connection);
}
