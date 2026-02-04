package domain.game.item.token;

import domain.game.item.ItemStatus;
import domain.player.PlayerId;

import java.util.UUID;

public class TokenBuilder {
    private TokenId id = TokenId.create();
    private ItemStatus status = ItemStatus.BOARD;
    private PlayerId ownerId = new PlayerId(UUID.randomUUID());

    public TokenBuilder withId(TokenId id) {
        this.id = id;
        return this;
    }

    public TokenBuilder withStatus(ItemStatus status) {
        this.status = status;
        return this;
    }

    public TokenBuilder withOwnerId(PlayerId ownerId) {
        this.ownerId = ownerId;
        return this;
    }

    public Token build() {
        return new Token(id, status, ownerId);
    }
}
