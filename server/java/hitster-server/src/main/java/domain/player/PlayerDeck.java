package domain.player;

import domain.game.item.ItemStatus;
import domain.game.item.card.Card;
import domain.game.item.token.Token;
import domain.game.item.token.TokenId;
import domain.player.exception.TokenNotFoundException;

import java.util.List;

public class PlayerDeck {
    private final List<Card> cards;
    private final List<Token> tokens;

    public PlayerDeck(List<Card> cards, List<Token> tokens) {
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

    public void addCurrentCardAndSetInactive(Card currentCard) {
        for (int i = 0; i < cards.size(); i++) {
            Card card = cards.get(i);
            if (currentCard.getDate() <= card.getDate()) {
                cards.add(i, currentCard);
                currentCard.setStatus(ItemStatus.INACTIVE);
                return;
            }
        }
        cards.add(currentCard);
        currentCard.setStatus(ItemStatus.INACTIVE);
    }
}
