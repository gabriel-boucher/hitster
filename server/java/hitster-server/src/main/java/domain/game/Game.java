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
    private final GameId id;
    private final GameStatus status;
    private final Players players;
    private final Pile pile;
    private final CurrentDeck currentDeck;
    private final GameInitializer gameInitializer;
    private final GameValidator gameValidator;

    public Game(GameId id, GameStatus status, Players players, Pile pile, CurrentDeck currentDeck, GameInitializer gameInitializer, GameValidator gameValidator) {
        this.id = id;
        this.status = status;
        this.players = players;
        this.pile = pile;
        this.currentDeck = currentDeck;
        this.gameInitializer = gameInitializer;
        this.gameValidator = gameValidator;
    }

    public GameId getId() {
        return id;
    }

    public GameStatus getStatus() {
        return status;
    }

    public List<Player> getPlayers() {
        return players.getPlayers();
    }

    public PlayerId getCurrentPlayerId() {
        return players.getCurrentPlayerId();
    }

    public CurrentDeck getCurrentDeck() {
        return currentDeck;
    }

    public Card getCurrentCard() {
        return pile.getCurrentCard();
    }

    public void startGame(List<Card> pile) {
        this.pile.setPile(pile);
        gameInitializer.initialize(players, this.pile, currentDeck);
    }

    public void nextTurn(PlayerId playerId) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateCanGoNextTurn(player, players.getCurrentPlayer(), status);

        Card currentCard = pile.getCurrentCard();
        PlayerId newCardOwnerId = currentDeck.getCurrentCardWinner(currentCard, playerId);
        pile.removeCurrentCard();

        if (newCardOwnerId != null) {
            Player newCardOwner = players.getPlayerById(newCardOwnerId);
            newCardOwner.addCurrentCardToDeckAndSetUsed(currentCard);
        }

        players.setNextPlayer();

        currentDeck.setAllTokensToUsed();
        List<Card> currentCards = players.getCurrentPlayerCards();
        currentDeck.setCurrentItems(currentCards);
    }

    public void addCurrentCardToCurrentDeck(PlayerId playerId) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateCanAddCurrentCardToCurrentDeck(player, players.getCurrentPlayer(), status);

        Card currentCard = pile.getCurrentCard();
        currentDeck.addCardToDeck(currentCard);
    }

    public void removeCurrentCardFromCurrentDeck(PlayerId playerId) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateCanRemoveCurrentCardFromCurrentDeck(player, players.getCurrentPlayer(), status);

        Card currentCard = pile.getCurrentCard();
        currentDeck.removeCardFromDeck(currentCard);
    }

    public void returnCurrentCardToPile(PlayerId playerId) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateCanReturnCurrentCardToPile(player, players.getCurrentPlayer(), status);

        Card currentCard = pile.getCurrentCard();
        currentDeck.returnCardToPile(currentCard);
    }

    public void moveCurrentCardInCurrentDeck(PlayerId playerId, int position) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateCanMoveCurrentCardInCurrentDeck(player, players.getCurrentPlayer(), status);

        Card currentCard = pile.getCurrentCard();
        currentDeck.moveCardInDeck(currentCard, position);
    }

    public void addTokenToCurrentDeck(PlayerId playerId, TokenId tokenId, int position) {
        Player player = players.getPlayerById(playerId);
        Token token = player.getTokenById(tokenId);
        gameValidator.validateCanAddTokenToCurrentDeck(player, players.getCurrentPlayer(), token, status);

        currentDeck.addTokenInDeck(token, position);
    }

    public void removeTokenFromCurrentDeck(PlayerId playerId, TokenId tokenId) {
        Player player = players.getPlayerById(playerId);
        Token token = player.getTokenById(tokenId);
        gameValidator.validateCanRemoveTokenFromCurrentDeck(player, players.getCurrentPlayer(), token, status);

        currentDeck.removeTokenFromDeck(token);
    }
}
