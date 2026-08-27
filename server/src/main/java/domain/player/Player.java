package domain.player;

import domain.deck.Deck;
import domain.deck.item.card.Card;
import domain.deck.item.token.Token;
import domain.deck.item.token.TokenId;

public class Player {
    private final PlayerId id;
    private String name;
    private PlayerColor color;
    private final Deck deck;
    private boolean isPlaying;

    public Player(PlayerId id, String name, PlayerColor playerColor, Deck deck, boolean isPlaying) {
        this.id = id;
        this.deck = deck;
        this.name = name;
        this.color = playerColor;
        this.isPlaying = isPlaying;
    }

    public PlayerId getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public PlayerColor getColor() {
        return color;
    }

    public Deck getDeck() {
        return deck;
    }

    public Token getTokenById(TokenId tokenId) {
        return deck.getTokenById(tokenId);
    }

    public void addCardToDeckAndSetUsed(Card currentCard) {
        deck.addCurrentCardAndSetUsed(currentCard);
    }

    public void addTokenToDeck(Token token) {
        deck.addToken(token);
    }

    public void setPlayerName(String newName) {
        name = newName;
    }

    public void setPlayerColor(PlayerColor newColor) {
        color = newColor;
    }

    public boolean isPlaying() {
        return isPlaying;
    }

    public void setPlaying(boolean playing) {
        isPlaying = playing;
    }

    public void setTokensForNextTurn() {
        deck.setTokensForNextTurn();
    }

    public void setTokensForCancelTurn() {
        deck.setTokensForCancelTurn();
    }
}
