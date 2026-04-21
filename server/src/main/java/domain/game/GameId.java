package domain.game;

import java.util.UUID;

public record GameId(UUID id) {
    public static GameId create() {
        return new GameId(UUID.randomUUID());
    }

    public static GameId fromString(String id) {
        return new GameId(UUID.fromString(id));
    }

    @Override
    public String toString() {
        return id.toString();
    }
}
