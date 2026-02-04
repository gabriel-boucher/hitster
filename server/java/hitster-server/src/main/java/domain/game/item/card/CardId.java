package domain.game.item.card;

public record CardId(String id) {
    @Override
    public String toString() {
        return id;
    }
}
