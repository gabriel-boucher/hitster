package domain.room;

import domain.game.GameFactory;
import domain.game.GameId;
import domain.game.GameStatus;
import domain.music.MusicPlayerType;
import domain.player.PlayerFactory;

import java.util.ArrayList;

public class RoomFactory {
    public Room create(GameFactory gameFactory, PlayerFactory playerFactory, RoomValidator roomValidator) {
        return new Room(
                GameId.create(),
                GameStatus.LOBBY,
                MusicPlayerType.IN_MEMORY,
                new ArrayList<>(),
                new ArrayList<>(),
                gameFactory,
                playerFactory,
                roomValidator
        );
    }
}
