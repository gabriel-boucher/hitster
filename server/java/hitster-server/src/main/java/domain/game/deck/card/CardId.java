package domain.game.deck.card;

public record CardId(String id) {
    @Override
    public String toString() {
        return id;
    }
}
