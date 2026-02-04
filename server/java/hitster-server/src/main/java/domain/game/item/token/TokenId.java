package domain.game.item.token;

import java.util.UUID;

public record TokenId(UUID id) {
    public static TokenId create() {
        return new TokenId(UUID.randomUUID());
    }

    public static TokenId fromString(String id) {
        return new TokenId(UUID.fromString(id));
    }

    @Override
    public String toString() {
        return id.toString();
    }
}
