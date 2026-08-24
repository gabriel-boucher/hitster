package domain.deck;

import domain.deck.item.ItemStatus;
import domain.deck.item.card.Card;
import domain.deck.item.token.Token;
import domain.deck.item.token.TokenId;
import domain.player.exception.TokenNotFoundException;

import java.util.List;

public class Deck {
    private final List<Card> cards;
    private final List<Token> tokens;

    public Deck(List<Card> cards, List<Token> tokens) {
        this.cards = cards;
        this.tokens = tokens;
    }

    public List<Card> getCards() {
        return cards;
    }

    public List<Token> getTokens() {
        return tokens;
    }

    public Token getTokenById(TokenId tokenId) {
        return tokens.stream()
                .filter(token -> token.getId().equals(tokenId))
                .findFirst()
                .orElseThrow(() -> new TokenNotFoundException(tokenId));
    }

    public void addCard(Card card) {
        cards.add(card);
    }

    public void addToken(Token token) {
        tokens.add(token);
    }

    public void addCurrentCardAndSetUsed(Card currentCard) {
        for (int i = 0; i < cards.size(); i++) {
            Card card = cards.get(i);
            if (currentCard.getDate() <= card.getDate()) {
                cards.add(i, currentCard);
                currentCard.setStatus(ItemStatus.USED);
                return;
            }
        }
        cards.add(currentCard);
        currentCard.setStatus(ItemStatus.USED);
    }
}
