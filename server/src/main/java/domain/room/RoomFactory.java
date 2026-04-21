package domain.room;

import domain.game.GameFactory;
import domain.game.GameStatus;
import domain.game.GameValidator;
import domain.player.PlayerFactory;
import domain.player.PlayerValidator;
import domain.music.PlaylistValidator;

import java.util.ArrayList;

public class RoomFactory {
    public Room create(GameFactory gameFactory, PlayerFactory playerFactory, RoomValidator roomValidator) {
        return new Room(
                RoomId.create(),
                GameStatus.LOBBY,
                new ArrayList<>(),
                new ArrayList<>(),
                gameFactory,
                playerFactory,
                roomValidator
        );
    }
}
