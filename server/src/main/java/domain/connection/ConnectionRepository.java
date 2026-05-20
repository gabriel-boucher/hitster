package domain.connection;

import domain.game.GameId;
import domain.player.PlayerId;

import java.util.Optional;

public interface ConnectionRepository {
    Optional<Connection> getConnectionByPlayerId(PlayerId playerId);
    Optional<Connection> getConnectionById(ConnectionId connectionId);
    void saveConnection(Connection connection);
    void removeConnectionByGameId(GameId gameId);
}
