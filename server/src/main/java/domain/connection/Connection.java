package domain.connection;

import domain.game.GameId;
import domain.player.PlayerId;

public class Connection {
    private ConnectionId connectionId;
    private final PlayerId playerId;
    private final GameId gameId;
    private boolean connected;

    public Connection(ConnectionId connectionId, PlayerId playerId, GameId gameId, boolean connected) {
        this.connectionId = connectionId;
        this.playerId = playerId;
        this.gameId = gameId;
        this.connected = connected;
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

    public void setConnectionId(ConnectionId connectionId) {
        this.connectionId = connectionId;
    }

    public void connect() {
        connected = true;
    }

    public void disconnect() {
        connected = false;
    }
}
