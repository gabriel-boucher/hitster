package domain.connection;

import domain.game.GameId;
import domain.player.PlayerId;

public class ConnectionFactory {
    public Connection create(ConnectionId connectionId, PlayerId playerId, GameId gameId) {
        return new Connection(connectionId, playerId, gameId);
    }
}
