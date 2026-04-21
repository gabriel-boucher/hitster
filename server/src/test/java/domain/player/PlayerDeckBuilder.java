package domain.player;

import domain.game.item.card.Card;
import domain.game.item.token.Token;

import java.util.ArrayList;
import java.util.List;

public class PlayerDeckBuilder {
    private List<Card> cards = new ArrayList<>();
    private List<Token> tokens = new ArrayList<>();

    public PlayerDeckBuilder withCards(List<Card> cards) {
        this.cards = cards;
        return this;
    }

    public PlayerDeckBuilder withCard(Card card) {
        this.cards.add(card);
        return this;
    }

    public PlayerDeckBuilder withTokens(List<Token> tokens) {
        this.tokens = tokens;
        return this;
    }

    public PlayerDeckBuilder withToken(Token token) {
        this.tokens.add(token);
        return this;
    }

    public PlayerDeck build() {
        return new PlayerDeck(cards, tokens);
    }
}
