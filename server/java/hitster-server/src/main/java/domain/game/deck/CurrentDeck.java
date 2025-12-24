package domain.game.deck;

import domain.game.deck.card.Card;
import domain.game.deck.exception.CardActiveException;
import domain.game.deck.exception.CardInactiveException;
import domain.game.deck.exception.TokenActiveException;
import domain.game.deck.exception.TokenInactiveException;
import domain.player.PlayerId;
import domain.game.deck.token.Token;

import java.util.List;

public class CurrentDeck {
    private final List<Moveable> currentItems;

    public CurrentDeck(List<Moveable> currentItems) {
        this.currentItems = currentItems;
    }

    public List<Moveable> getCurrentItems() {
        return currentItems;
    }

    public void setCurrentItems(List<Card> currentItems) {
        this.currentItems.clear();
        this.currentItems.addAll(currentItems);
    }

    public void addCardAndSetActive(Card card, int position) {
        if (card.getStatus() == ItemStatus.ACTIVE) {
            throw new CardActiveException();
        }

        position = Math.clamp(position, 0, currentItems.size());
        int prevPosition = position - 1;

        if (prevPosition >= 0 && currentItems.get(prevPosition) instanceof Token token) { // previous is a token
            removeTokenAndSetInactive(token);
            position--;
        }

        if (position < currentItems.size() && currentItems.get(position) instanceof Token token) { // current is a token
            removeTokenAndSetInactive(token);
        }
        currentItems.add(position, card);
        card.setStatus(ItemStatus.ACTIVE);
    }

    public void removeCardAndSetInactive(Card card) {
        if (card.getStatus() == ItemStatus.INACTIVE) {
            throw new CardInactiveException();
        }
        currentItems.remove(card);
        card.setStatus(ItemStatus.INACTIVE);
    }

    public void reorderCard(Card card, int newPosition) {
        if (card.getStatus() == ItemStatus.INACTIVE) {
            throw new CardInactiveException();
        }
        removeCardAndSetInactive(card);
        addCardAndSetActive(card, newPosition);
    }

    public void addTokenAndSetActive(Token token, int position) {
        if (token.getStatus() == ItemStatus.ACTIVE) {
            throw new TokenActiveException(token.getId());
        }
        position = Math.clamp(position, 0, currentItems.size());
        int prevPosition = position - 1;
        if (!(prevPosition >= 0 && currentItems.get(prevPosition).getStatus() == ItemStatus.ACTIVE || // previous is a token or currentCard
                position < currentItems.size() && currentItems.get(position).getStatus() == ItemStatus.ACTIVE)) { // current is a token or currentCard
            currentItems.add(position, token);
            token.setStatus(ItemStatus.ACTIVE);
        }
    }

    public void removeTokenAndSetInactive(Token token) {
        if (token.getStatus() == ItemStatus.INACTIVE) {
            throw new TokenInactiveException(token.getId());
        }
        currentItems.remove(token);
        token.setStatus(ItemStatus.INACTIVE);
    }

    public void setAllTokensToUsed() {
        for (Moveable item : currentItems) {
            if (item instanceof Token token) {
                token.setStatus(ItemStatus.USED);
            }
        }
    }

    public PlayerId getCurrentCardWinner(Card currentCard, PlayerId currentPlayerId) {
        if (currentCard.getStatus() == ItemStatus.INACTIVE) {
            throw new CardInactiveException();
        }
        int currentIndex = currentItems.indexOf(currentCard);

        // 1. Check if the current card is valid in its current position
        Moveable previousItem = (currentIndex > 0) ? currentItems.get(currentIndex - 1) : null;
        Moveable nextItem = (currentIndex < currentItems.size() - 1) ? currentItems.get(currentIndex + 1) : null;

        int minDate = Integer.MIN_VALUE;
        int maxDate = Integer.MAX_VALUE;

        // Based on rules, neighbors of currentCard are guaranteed not to be Tokens
        if (previousItem instanceof Card c) {
            minDate = c.getDate();
        }
        if (nextItem instanceof Card c) {
            maxDate = c.getDate();
        }

        // If valid, return the current player's ID
        if (currentCard.getDate() >= minDate && currentCard.getDate() <= maxDate) {
            return currentPlayerId;
        }

        // 2. If invalid, find where the card *should* have been and check for a token
        Token tokenInGap = null;

        for (Moveable item : currentItems) {
            // We simulate the list as if the currentCard wasn't there to find the correct slot
            if (item == currentCard) continue;

            if (item instanceof Token token) {
                tokenInGap = token;
            } else if (item instanceof Card card) {
                // Check if currentCard fits before this card
                if (currentCard.getDate() <= card.getDate()) {
                    // We found the correct slot. Is there a token here?
                    return (tokenInGap != null) ? tokenInGap.getOwnerId() : null;
                }
                // If we pass a card, the previous "gap" is closed.
                // Reset token tracking for the new gap following this card.
                tokenInGap = null;
            }
        }

        // Edge Case: If the card belongs at the very end of the list
        // (i.e., its date is greater than all other cards), check if there is a token at the end.
        return (tokenInGap != null) ? tokenInGap.getOwnerId() : null;
    }
}
