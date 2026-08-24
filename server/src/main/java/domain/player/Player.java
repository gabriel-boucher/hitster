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

    public Player(PlayerId id, String name, PlayerColor playerColor, Deck deck) {
        this.id = id;
        this.deck = deck;
        this.name = name;
        this.color = playerColor;
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

    public void addCurrentCardToDeckAndSetUsed(Card currentCard) {
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
}
