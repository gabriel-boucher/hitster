package domain.room.exception;

public class PlayerNameNotSetException extends RuntimeException {
    public PlayerNameNotSetException() {
        super("Not all players have set a name.");
    }
}
