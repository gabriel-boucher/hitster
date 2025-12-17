package domain.game.player;

public record PlayerId(String id) {
    public static PlayerId fromString(String id) {
        return new PlayerId(id);
    }

    @Override
    public String toString() {
        return id.toString();
    }
}
