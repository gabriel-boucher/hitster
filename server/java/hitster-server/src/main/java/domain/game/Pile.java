package domain.game;

import domain.game.item.card.Card;
import domain.game.exception.InvalidPileException;

import java.util.List;

public class Pile {
    private final List<Card> pile;

    public Pile(List<Card> pile) {
        this.pile = pile;
    }

    public Card getCurrentCard() {
        if (pile.isEmpty()) {
            throw new InvalidPileException();
        }
        return pile.getLast();
    }

    public Card removeCurrentCard() {
        if (pile.isEmpty()) {
            throw new InvalidPileException();
        }
        return pile.removeLast();
    }
}
