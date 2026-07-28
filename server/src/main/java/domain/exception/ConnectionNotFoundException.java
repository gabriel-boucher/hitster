package domain.exception;

import domain.connection.ConnectionId;
import domain.player.PlayerId;
import interfaces.exception.NotFoundException;

public class ConnectionNotFoundException extends NotFoundException {
    public ConnectionNotFoundException(ConnectionId connectionId) {
        super("Connection with ID " + connectionId + " not found.");
    }

    public ConnectionNotFoundException(PlayerId playerId) {
        super("Connection with Player ID " + playerId + " not found.");
    }
}
