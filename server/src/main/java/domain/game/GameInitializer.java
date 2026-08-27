package domain.game;

import domain.deck.currentDeck.CurrentDeck;
import domain.deck.item.ItemStatus;
import domain.deck.item.card.Card;
import domain.deck.item.token.Token;
import domain.deck.item.token.TokenId;
import domain.player.Player;
import domain.player.Players;

import java.util.List;

public class GameInitializer {
    public void initialize(Players players, Stack stack, CurrentDeck currentDeck) {
        initializePlayers(players, stack);
        initializeCurrentPlayer(players);
        initializeCurrentDeck(currentDeck, players);
    }

    private void initializePlayers(Players players, Stack stack) {
        for (Player player : players.getPlayers()) {
            giveStartingCards(stack, player);
            giveStartingTokens(player);
        }
    }

    private void giveStartingCards(Stack stack, Player player) {
        Card card = stack.removeRandomCard();
        player.addCardToDeckAndSetUsed(card);
    }

    public void giveStartingCardsExceptCurrent(Stack stack, Player player) {
        Card card = stack.removeRandomCardExceptCurrent();
        player.addCardToDeckAndSetUsed(card);
    }

    public void giveStartingTokens(Player player) {
        for (int i = 0; i < 2; i++) {
            player.addTokenToDeck(new Token(
                    TokenId.create(),
                    ItemStatus.UNUSED,
                    player.getId()
            ));
        }
    }

    private void initializeCurrentPlayer(Players players) {
        int playerCount = players.getPlayers().size();
        int currentPlayerIndex = (int) (Math.random() * playerCount);
        players.setCurrentPlayerId(players.getPlayers().get(currentPlayerIndex).getId());
    }

    private void initializeCurrentDeck(CurrentDeck currentDeck, Players players) {
        List<Card> currentPlayerCards = players.getCurrentPlayerCards();
        currentDeck.setCurrentItems(currentPlayerCards);
    }
}
