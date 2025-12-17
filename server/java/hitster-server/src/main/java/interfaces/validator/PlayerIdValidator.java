package interfaces.validator;

import domain.game.player.PlayerId;

import java.util.Objects;

public class PlayerIdValidator {
    public PlayerId validate(Object playerIdObject) {
        String playerId = Objects.toString(playerIdObject, "");

        if (playerId.isBlank()) {
            throw new IllegalArgumentException("Player ID cannot be null or empty.");
        }

        if (!(playerIdObject instanceof String)) {
            throw new IllegalArgumentException("Player ID must be a string.");
        }

        return PlayerId.fromString(playerId);
    }
}
