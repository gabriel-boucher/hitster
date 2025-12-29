package domain.player;

import java.util.ArrayList;

public class PlayerFactory {
    public Player create(PlayerId playerId) {
        return new Player(playerId, new PlayerDeck(new ArrayList<>(), new ArrayList<>()));
    }
}
