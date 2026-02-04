package domain.game;

import domain.game.currentDeck.CurrentDeck;
import domain.game.item.card.Card;
import domain.player.PlayerValidator;
import domain.player.Players;
import domain.room.Room;

import java.util.ArrayList;
import java.util.List;

public class GameFactory {
    public Game createGame(Room room) {
        return new Game(
                GameId.fromString(room.getId().toString()),
                GameStatus.PLAYING,
                new Players(room.getPlayers()),
                new Pile(new ArrayList<>()),
                new CurrentDeck(new ArrayList<>()),
                new GameInitializer(),
                new GameValidator()
        );
    }
}
