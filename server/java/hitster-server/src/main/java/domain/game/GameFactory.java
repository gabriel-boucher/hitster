package domain.game;

import domain.game.deck.CurrentDeck;
import domain.game.deck.card.Card;
import domain.game.player.Players;
import domain.room.Room;

import java.util.ArrayList;
import java.util.List;

public class GameFactory {
    public Game createGame(Room room, List<Card> pile) {
        return new Game(
                GameId.fromString(room.getId().toString()),
                GameStatus.PLAYING,
                new Players(room.getPlayers(), 0),
                new Pile(pile),
                new CurrentDeck(new ArrayList<>()),
                new GameInitializer()
        );
    }
}
