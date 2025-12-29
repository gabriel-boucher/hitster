package domain.game;

import domain.game.currentDeck.CurrentDeck;
import domain.game.item.ItemStatus;
import domain.game.item.card.Card;
import domain.game.item.token.Token;
import domain.game.item.token.TokenId;
import domain.player.Player;
import domain.player.Players;

import java.util.List;

public class GameInitializer {
    public void initialize(Players players, Pile pile, CurrentDeck currentDeck) {
        initializePlayers(players, pile);
        initializeCurrentPlayer(players);
        initializeCurrentDeck(currentDeck, players);
    }

    private void initializePlayers(Players players, Pile pile) {
        for (Player player : players.getPlayers()) {
            giveStartingCards(pile, player);
            giveStartingTokens(player);
        }
    }

    private void giveStartingCards(Pile pile, Player player) {
        Card card = pile.removeCurrentCard();
        player.addCardToDeck(card);
    }

    private void giveStartingTokens(Player player) {
        for (int i = 0; i < 2; i++) {
            player.addTokenToDeck(new Token(
                    TokenId.create(),
                    ItemStatus.INACTIVE,
                    player.getId()
            ));
        }
    }

    private void initializeCurrentPlayer(Players players) {
        int playerCount = players.getPlayers().size();
        int currentPlayerIndex = (int) (Math.random() * playerCount);
        players.setCurrentPlayerIndex(currentPlayerIndex);
    }

    private void initializeCurrentDeck(CurrentDeck currentDeck, Players players) {
        List<Card> currentPlayerCards = players.getCurrentPlayerCards();
        currentDeck.setCurrentItems(currentPlayerCards);
    }
}
