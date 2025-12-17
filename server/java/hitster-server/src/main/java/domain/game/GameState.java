package domain.game;

import domain.game.deck.CurrentDeck;
import domain.game.deck.Moveable;
import domain.game.deck.card.Card;
import domain.game.deck.token.Token;
import domain.game.player.Player;

import java.util.List;

public class GameState {
    private final GameId gameId;
    private GameStatus gameStatus;
    private final List<Player> players;
    private final List<Card> stack;
    private final CurrentDeck currentDeck;
    private int currentPlayerIndex;

    public GameState(GameId gameId, GameStatus gameStatus, List<Player> players, List<Card> stack, CurrentDeck currentDeck, int currentPlayerIndex) {
        this.gameId = gameId;
        this.gameStatus = gameStatus;
        this.players = players;
        this.stack = stack;
        this.currentDeck = currentDeck;
        this.currentPlayerIndex = currentPlayerIndex;
    }

    public GameId getGameId() {
        return gameId;
    }

    public GameStatus getGameStatus() {
        return gameStatus;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public List<Card> getStack() {
        return stack;
    }

    public CurrentDeck getCurrentDeck() {
        return currentDeck;
    }

    public int getCurrentPlayerIndex() {
        return currentPlayerIndex;
    }

    public void setGameStatus(GameStatus gameStatus) {
        this.gameStatus = gameStatus;
    }

    public void setCurrentPlayerIndex(int currentPlayerIndex) {
        this.currentPlayerIndex = currentPlayerIndex;
    }

    public void printGameState() {
        for (Player player : players) {
            System.out.println("Player: " + player.getId().toString());
            for (Card card : player.getDeck().getCards()) {
                System.out.println("  - " + card.getId().toString());
            }
            System.out.println();
        }

        System.out.println("Pile");
        for (Card card : stack) {
            System.out.println("  - " + card.getId().toString());
        }
        System.out.println();

        System.out.println("Current PlayerDeck");
        for (Moveable item : currentDeck.getCurrentItems()) {
            if (item instanceof Card card) {
                System.out.println("  - " + card.getId().toString());
            } else if (item instanceof Token token) {
                System.out.println("  - " + token.getId().toString());
            }
        }
    }
}
