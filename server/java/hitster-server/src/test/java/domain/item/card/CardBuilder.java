package domain.item.card;

import domain.game.item.ItemStatus;
import domain.game.item.card.Card;
import domain.game.item.card.CardId;

public class CardBuilder {
    private CardId id = new CardId("default-id");
    private ItemStatus status = ItemStatus.INACTIVE;
    private int date = 0;

    public CardBuilder withId(CardId id) {
        this.id = id;
        return this;
    }

    public CardBuilder withStatus(ItemStatus status) {
        this.status = status;
        return this;
    }

    public CardBuilder withDate(int date) {
        this.date = date;
        return this;
    }

    public Card build() {
        return new Card(id, status, date);
    }
}
