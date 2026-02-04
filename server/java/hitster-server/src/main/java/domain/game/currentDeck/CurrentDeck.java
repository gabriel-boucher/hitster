package domain.game.currentDeck;

import domain.game.currentDeck.exception.*;
import domain.game.item.ItemStatus;
import domain.game.item.card.Card;
import domain.game.item.Moveable;
import domain.player.PlayerId;
import domain.game.item.token.Token;

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

    public void addCardToDeck(Card card) {
        if (card.getStatus() != ItemStatus.MOVING_IN_CURRENT_DECK) {
            throw new CardAlreadyInCurrentDeckException();
        }

        for (Moveable item : currentItems) {
            if (item == card) {
                item.setStatus(ItemStatus.ACTIVE_IN_CURRENT_DECK);
            }
        }
    }

    public void removeCardFromDeck(Card card) {
        if (card.getStatus() != ItemStatus.MOVING_IN_CURRENT_DECK) {
            throw new CardNotInCurrentDeckException();
        }

        currentItems.remove(card);
        card.setStatus(ItemStatus.BOARD);
    }

    public void returnCardToPile(Card card) {
        if (card.getStatus() != ItemStatus.BOARD) {
            throw new CardAlreadyInPileException();
        }

        card.setStatus(ItemStatus.UNUSED);
    }

    public void moveCardInDeck(Card card, int position) {
        currentItems.remove(card);

        position = Math.clamp(position, 0, currentItems.size());
        int prevPosition = position - 1;

        if (prevPosition >= 0 && currentItems.get(prevPosition) instanceof Token token) { // previous is a token
            removeTokenFromDeck(token);
            position--;
        }

        if (position < currentItems.size() && currentItems.get(position) instanceof Token token) { // current is a token
            removeTokenFromDeck(token);
        }

        currentItems.add(position, card);
        card.setStatus(ItemStatus.MOVING_IN_CURRENT_DECK);
    }

    public void addTokenInDeck(Token token, int position) {
        if (token.getStatus() == ItemStatus.ACTIVE_IN_CURRENT_DECK) {
            throw new TokenAlreadyInCurrentDeckException(token.getId());
        }

        position = Math.clamp(position, 0, currentItems.size());
        int prevPosition = position - 1;
        if (!(prevPosition >= 0 && currentItems.get(prevPosition).getStatus() == ItemStatus.ACTIVE_IN_CURRENT_DECK || // previous is a token or currentCard
                position < currentItems.size() && currentItems.get(position).getStatus() == ItemStatus.ACTIVE_IN_CURRENT_DECK)) { // current is a token or currentCard
            currentItems.add(position, token);
            token.setStatus(ItemStatus.ACTIVE_IN_CURRENT_DECK);
        }
    }

    public void removeTokenFromDeck(Token token) {
        if (token.getStatus() == ItemStatus.UNUSED) {
            throw new TokenAlreadyInPlayerDeckException(token.getId());
        }

        currentItems.remove(token);
        token.setStatus(ItemStatus.UNUSED);
    }

    public void setAllTokensToUsed() {
        for (Moveable item : currentItems) {
            if (item instanceof Token token) {
                token.setStatus(ItemStatus.USED);
            }
        }
    }

    public PlayerId getCurrentCardWinner(Card currentCard, PlayerId currentPlayerId) {
        if (currentCard.getStatus() != ItemStatus.ACTIVE_IN_CURRENT_DECK) {
            throw new CardNotInCurrentDeckException();
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

        // 2. If invalid, find where the card *should* have been and check for a id
        Token tokenInGap = null;

        for (Moveable item : currentItems) {
            // We simulate the list as if the currentCard wasn't there to find the correct slot
            if (item == currentCard) continue;

            if (item instanceof Token token) {
                tokenInGap = token;
            } else if (item instanceof Card card) {
                // Check if currentCard fits before this card
                if (currentCard.getDate() <= card.getDate()) {
                    // We found the correct slot. Is there a id here?
                    return (tokenInGap != null) ? tokenInGap.getOwnerId() : null;
                }
                // If we pass a card, the previous "gap" is closed.
                // Reset id tracking for the new gap following this card.
                tokenInGap = null;
            }
        }

        // Edge Case: If the card belongs at the very end of the list
        // (i.e., its date is greater than all other cards), check if there is a id at the end.
        return (tokenInGap != null) ? tokenInGap.getOwnerId() : null;
    }
}
