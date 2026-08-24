package domain.deck.item.card;

public record CardId(String id) {
    @Override
    public String toString() {
        return id;
    }
}
