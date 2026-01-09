package domain.game;

import domain.game.currentDeck.CurrentDeck;
import domain.game.item.card.Card;
import domain.game.item.token.Token;
import domain.game.item.token.TokenId;
import domain.player.Player;
import domain.player.PlayerId;
import domain.player.Players;

import java.util.List;

public class Game {
    private final GameId gameId;
    private GameStatus gameStatus;
    private final Players players;
    private final Pile pile;
    private final CurrentDeck currentDeck;
    private final GameInitializer gameInitializer;
    private final GameValidator gameValidator;

    public Game(GameId gameId, GameStatus gameStatus, Players players, Pile pile, CurrentDeck currentDeck, GameInitializer gameInitializer, GameValidator gameValidator) {
        this.gameId = gameId;
        this.gameStatus = gameStatus;
        this.players = players;
        this.pile = pile;
        this.currentDeck = currentDeck;
        this.gameInitializer = gameInitializer;
        this.gameValidator = gameValidator;
    }

    public GameId getId() {
        return gameId;
    }

    public List<Player> getPlayers() {
        return players.getPlayers();
    }

    public int getCurrentPlayerIndex() {
        return players.getCurrentPlayerIndex();
    }

    public CurrentDeck getCurrentDeck() {
        return currentDeck;
    }

    public Card getCurrentCard() {
        return pile.getCurrentCard();
    }

    public void startGame(PlayerId playerId) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateCanStartGame(gameStatus, player, players.getCurrentPlayer());

        gameStatus = GameStatus.PLAYING;
        gameInitializer.initialize(players, pile, currentDeck);
    }

    public void nextTurn(PlayerId playerId) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateIsPlayerTurn(gameStatus, player, players.getCurrentPlayer());

        Card currentCard = pile.getCurrentCard();
        PlayerId newCardOwnerId = currentDeck.getCurrentCardWinner(currentCard, playerId);
        pile.removeCurrentCard();

        if (newCardOwnerId != null) {
            Player newCardOwner = players.getPlayerById(newCardOwnerId);
            newCardOwner.addCurrentCardToDeckAndSetInactive(currentCard);
        }

        players.setNextPlayer();

        currentDeck.setAllTokensToUsed();
        List<Card> currentCards = players.getCurrentPlayerCards();
        currentDeck.setCurrentItems(currentCards);
    }

    public void addCurrentCardToCurrentDeck(PlayerId playerId, int position) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateIsPlayerTurn(gameStatus, player, players.getCurrentPlayer());

        Card currentCard = pile.getCurrentCard();
        currentDeck.addCardAndSetActive(currentCard, position);
    }

    public void removeCurrentCardFromCurrentDeck(PlayerId playerId) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateIsPlayerTurn(gameStatus, player, players.getCurrentPlayer());

        Card currentCard = pile.getCurrentCard();
        currentDeck.removeCardAndSetInactive(currentCard);
    }

    public void reorderCurrentCardInCurrentDeck(PlayerId playerId, int newPosition) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateIsPlayerTurn(gameStatus, player, players.getCurrentPlayer());

        Card currentCard = pile.getCurrentCard();
        currentDeck.reorderCard(currentCard, newPosition);
    }

    public void addTokenToCurrentDeck(PlayerId playerId, TokenId tokenId, int position) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateIsNotPlayerTurn(gameStatus, player, players.getCurrentPlayer());

        Token token = player.getTokenById(tokenId);
        currentDeck.addTokenAndSetActive(token, position);
    }

    public void removeTokenFromCurrentDeck(PlayerId playerId, TokenId tokenId) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateIsNotPlayerTurn(gameStatus, player, players.getCurrentPlayer());

        Token token = player.getTokenById(tokenId);
        currentDeck.removeTokenAndSetInactive(token);
    }
}
