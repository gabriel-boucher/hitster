package domain.deck.item.token;

import domain.deck.item.Moveable;
import domain.deck.item.ItemStatus;
import domain.deck.item.card.Card;
import domain.player.PlayerId;

public class Token implements Moveable {
    private final TokenId id;
    private ItemStatus status;
    private final PlayerId ownerId;

    public Token(TokenId id, ItemStatus status, PlayerId ownerId) {
        this.id = id;
        this.status = status;
        this.ownerId = ownerId;
    }

    public TokenId getId() {
        return id;
    }

    public ItemStatus getStatus() {
        return status;
    }

    public void setStatus(ItemStatus status) {
        this.status = status;
    }

    public PlayerId getOwnerId() {
        return ownerId;
    }

    @Override
    public boolean equals(Object other) {
        if (!(other instanceof Token otherToken)) {
            return false;
        }
        return this.id.equals(otherToken.id);
    }
}
