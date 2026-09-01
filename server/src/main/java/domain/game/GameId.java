package domain.game;

public record GameId(String id) {
    private static final String CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no 0,O,1,I
    private static final int LENGTH = 5;

    public static GameId create() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < LENGTH; i++) {
            sb.append(CHARS.charAt((int) (Math.random() * CHARS.length())));
        }
        return new GameId(sb.toString());
    }

    public static GameId fromString(String id) {
        if (id.length() != LENGTH) {
            throw new IllegalArgumentException("GameId must be " + LENGTH + " characters long");
        }
        for (int i = 0; i < id.length(); i++) {
            if (CHARS.indexOf(id.charAt(i)) == -1) {
                throw new IllegalArgumentException("GameId contains invalid characters");
            }
        }
        return new GameId(id);
    }

    @Override
    public String toString() {
        return id;
    }
}
