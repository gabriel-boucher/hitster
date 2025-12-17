package domain.game.deck.card;

import domain.game.deck.Moveable;
import domain.game.deck.ItemStatus;

public class Card implements Moveable {
    private final CardId id;
    private ItemStatus status;
    private final int date;

    public Card(CardId id, ItemStatus status, int date) {
        this.id = id;
        this.status = status;
        this.date = date;
    }

    public CardId getId() {
        return id;
    }

    public ItemStatus getStatus() {
        return status;
    }

    public int getDate() {
        return date;
    }

    public void setStatus(ItemStatus status) {
        this.status = status;
    }
}
