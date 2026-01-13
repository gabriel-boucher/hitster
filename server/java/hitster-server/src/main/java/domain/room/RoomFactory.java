package domain.room;

import domain.game.GameFactory;
import domain.game.GameStatus;
import domain.game.GameValidator;
import domain.player.PlayerFactory;
import domain.player.PlayerValidator;
import domain.spotify.accessToken.AccessToken;
import domain.spotify.PlaylistValidator;

import java.util.ArrayList;

public class RoomFactory {
    public Room create(AccessToken accessToken, GameFactory gameFactory, PlayerFactory playerFactory) {
        return new Room(
                RoomId.create(),
                accessToken,
                GameStatus.LOBBY,
                new ArrayList<>(),
                new ArrayList<>(),
                gameFactory,
                playerFactory,
                new RoomValidator(new PlayerValidator(), new PlaylistValidator(), new GameValidator())
        );
    }
}
