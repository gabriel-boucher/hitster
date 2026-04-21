package interfaces.validator;

import domain.game.GameId;

import java.util.Objects;

public class GameIdValidator {
    public GameId validate(Object gameIdObject) {
        String gameId = Objects.toString(gameIdObject, "");

        if (gameId.isBlank()) {
            throw new IllegalArgumentException("Game ID cannot be null or empty.");
        }

        if (!(gameIdObject instanceof String)) {
            throw new IllegalArgumentException("Game ID must be a string.");
        }

        return GameId.fromString(gameId);
    }
}
