package domain.player;

import java.util.UUID;

public record PlayerId(UUID id) {
    public static PlayerId fromString(String id) {
        return new PlayerId(UUID.fromString(id));
    }

    @Override
    public String toString() {
        return id.toString();
    }
}
