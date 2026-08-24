package domain.game;

import domain.deck.item.card.Card;
import domain.game.exception.InvalidPileException;

import java.util.List;

public class Stack {
    private final List<Card> cards;

    public Stack(List<Card> cards) {
        this.cards = cards;
    }

    public List<Card> getCards() {
        return cards;
    }

    public void setCards(List<Card> stack) {
        this.cards.clear();
        this.cards.addAll(stack);
    }

    public Card getCurrentCard() {
        if (cards.isEmpty()) {
            throw new InvalidPileException();
        }
        return cards.getLast();
    }

    public void setCurrentCard(Card card) {
        if (cards.isEmpty()) {
            throw new InvalidPileException();
        }
        cards.set(cards.size() - 1, card);
    }

    public Card removeCurrentCard() {
        if (cards.isEmpty()) {
            throw new InvalidPileException();
        }
        return cards.removeLast();
    }
}
