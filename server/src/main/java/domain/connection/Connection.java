package domain.connection;

import domain.game.GameId;
import domain.player.PlayerId;

public class Connection {
    private final ConnectionId connectionId;
    private final PlayerId playerId;
    private final GameId gameId;

    public Connection(ConnectionId connectionId, PlayerId playerId, GameId gameId) {
        this.connectionId = connectionId;
        this.playerId = playerId;
        this.gameId = gameId;
    }

    public ConnectionId getConnectionId() {
        return connectionId;
    }

    public PlayerId getPlayerId() {
        return playerId;
    }

    public GameId getGameId() {
        return gameId;
    }
}
