package domain.game;

import domain.game.deck.card.Card;

import java.util.List;

public class Pile {
    private final List<Card> pile;

    public Pile(List<Card> pile) {
        this.pile = pile;
    }

    public Card getCurrentCard() {
        if (pile.isEmpty()) {
            throw new IllegalArgumentException("Pile is empty, no current card available.");
        }
        return pile.getLast();
    }

    public Card removeCurrentCard() {
        if (pile.isEmpty()) {
            throw new IllegalArgumentException("Pile is empty, no card to remove.");
        }
        return pile.removeLast();
    }
}
