package domain.player;

import domain.game.item.card.Card;
import domain.game.item.token.Token;
import domain.game.item.token.TokenId;

public class Player {
    private final PlayerId id;
    private final PlayerDeck deck;

    public Player(PlayerId id, PlayerDeck deck) {
        this.id = id;
        this.deck = deck;
    }

    public PlayerId getId() {
        return id;
    }

    public PlayerDeck getDeck() {
        return deck;
    }

    public Token getTokenById(TokenId tokenId) {
        return deck.getTokenById(tokenId);
    }

    public void addCurrentCardToDeckAndSetInactive(Card currentCard) {
        deck.addCurrentCardAndSetInactive(currentCard);
    }

    public void addCardToDeck(Card card) {
        deck.addCard(card);
    }

    public void addTokenToDeck(Token token) {
        deck.addToken(token);
    }
}
