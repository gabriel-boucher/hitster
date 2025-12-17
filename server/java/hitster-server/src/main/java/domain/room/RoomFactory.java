package domain.room;

import domain.game.player.Player;
import domain.game.player.PlayerFactory;
import domain.game.player.PlayerId;

import java.util.ArrayList;
import java.util.List;

public class RoomFactory {
    public Room create(RoomId roomId, PlayerId playerId, PlayerFactory playerFactory) {
        Player player = playerFactory.create(playerId);
        return new Room(
                roomId,
                new ArrayList<>(List.of(player)),
                new ArrayList<>(),
                playerFactory
        );
    }
}
