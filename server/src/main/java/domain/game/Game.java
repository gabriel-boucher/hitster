package domain.game;

import domain.deck.currentDeck.CurrentDeck;
import domain.deck.item.card.Card;
import domain.deck.item.token.Token;
import domain.deck.item.token.TokenId;
import domain.player.Player;
import domain.player.PlayerId;
import domain.player.Players;

import java.util.List;
import java.util.Optional;

public class Game {
    private final GameId id;
    private final GameStatus status;
    private final Players players;
    private final Stack stack;
    private final CurrentDeck currentDeck;
    private final GameInitializer gameInitializer;
    private final GameValidator gameValidator;

    public Game(GameId id, GameStatus status, Players players, Stack stack, CurrentDeck currentDeck, GameInitializer gameInitializer, GameValidator gameValidator) {
        this.id = id;
        this.status = status;
        this.players = players;
        this.stack = stack;
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

    public Player getCurrentPlayer() {
        return players.getCurrentPlayer();
    }

    public Stack getStack() {
        return stack;
    }

    public CurrentDeck getCurrentDeck() {
        return currentDeck;
    }

    public Card getCurrentCard() {
        return stack.getCurrentCard();
    }

    public void startGame(List<Card> stack) {
        this.stack.setCards(stack);
        gameInitializer.initialize(players, this.stack, currentDeck);
    }

    public void nextTurn(PlayerId playerId) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateCanGoNextTurn(player, players.getCurrentPlayer(), status);

        Card currentCard = stack.getCurrentCard();
        PlayerId newCardOwnerId = currentDeck.getCurrentCardWinner(currentCard, playerId);
        stack.removeCurrentCard();

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

        Card currentCard = stack.getCurrentCard();
        currentDeck.addCardToDeck(currentCard);
    }

    public void removeCurrentCardFromCurrentDeck(PlayerId playerId) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateCanRemoveCurrentCardFromCurrentDeck(player, players.getCurrentPlayer(), status);

        Card currentCard = stack.getCurrentCard();
        currentDeck.removeCardFromDeck(currentCard);
    }

    public void returnCurrentCardToPile(PlayerId playerId) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateCanReturnCurrentCardToPile(player, players.getCurrentPlayer(), status);

        Card currentCard = stack.getCurrentCard();
        currentDeck.returnCardToStack(currentCard);
    }

    public void moveCurrentCardInCurrentDeck(PlayerId playerId, int position) {
        Player player = players.getPlayerById(playerId);
        gameValidator.validateCanMoveCurrentCardInCurrentDeck(player, players.getCurrentPlayer(), status);

        Card currentCard = stack.getCurrentCard();
        Optional<Token> token = currentDeck.moveCardInDeck(currentCard, position);
        token.ifPresent(t -> removeTokenFromCurrentDeck(t.getOwnerId(), t.getId()));
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

        System.out.println(token.getStatus().toString());
    }
}
