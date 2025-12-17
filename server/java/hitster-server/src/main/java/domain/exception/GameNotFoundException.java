package domain.exception;

import domain.game.GameId;

public class GameNotFoundException extends RuntimeException {
    public GameNotFoundException(GameId gameId) {
        super("Game with ID " + gameId + " not found.");
    }
}
