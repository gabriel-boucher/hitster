package domain.game.item.token;

import domain.game.item.Moveable;
import domain.game.item.ItemStatus;
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
}
