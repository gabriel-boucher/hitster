package domain.player;

import domain.game.item.card.Card;
import domain.game.item.token.Token;
import domain.game.item.token.TokenId;

public class Player {
    private final PlayerId id;
    private String name;
    private PlayerColor color;
    private final PlayerDeck deck;

    public Player(PlayerId id, String name, PlayerColor playerColor, PlayerDeck deck) {
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

    public PlayerDeck getDeck() {
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
