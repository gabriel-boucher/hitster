package domain.exception;

import domain.connection.ConnectionId;
import interfaces.exception.NotFoundException;

public class ConnectionNotFoundException extends NotFoundException {
    public ConnectionNotFoundException(ConnectionId connectionId) {
        super("Connection with ID " + connectionId + " not found.");
    }
}
