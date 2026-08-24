package domain.game;

import domain.deck.currentDeck.CurrentDeck;
import domain.player.Players;
import domain.room.Room;

import java.util.ArrayList;

public class GameFactory {
    public Game createGame(Room room) {
        return new Game(
                GameId.fromString(room.getId().toString()),
                room.getGameStatus(),
                new Players(room.getPlayers(), room.getPlayers().getFirst().getId()),
                new Stack(new ArrayList<>()),
                new CurrentDeck(new ArrayList<>()),
                new GameInitializer(),
                new GameValidator()
        );
    }
}
