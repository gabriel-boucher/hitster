package domain.player;

import java.util.ArrayList;

public class PlayerBuilder {
    private PlayerId playerId = PlayerId.fromString("default-player-id");
    private String name = "Default Player";
    private PlayerColor color = PlayerColor.RED;
    private PlayerDeck deck = new PlayerDeck(new ArrayList<>(), new ArrayList<>());

    public PlayerBuilder withPlayerId(PlayerId playerId) {
        this.playerId = playerId;
        return this;
    }

    public PlayerBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public PlayerBuilder withColor(PlayerColor color) {
        this.color = color;
        return this;
    }

    public PlayerBuilder withDeck(PlayerDeck deck) {
        this.deck = deck;
        return this;
    }

    public Player build() {
        return new Player(playerId, name, color, deck);
    }
}
