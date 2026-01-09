package domain.room;

import domain.player.Player;
import domain.player.PlayerFactory;
import domain.player.PlayerId;

import java.util.ArrayList;
import java.util.List;

public class RoomFactory {
    public Room create(PlayerId playerId, PlayerFactory playerFactory) {
        Player player = playerFactory.create(playerId);
        return new Room(
                RoomId.create(),
                null,
                new ArrayList<>(List.of(player)),
                new ArrayList<>(),
                playerFactory,
                new RoomValidator()
        );
    }
}
