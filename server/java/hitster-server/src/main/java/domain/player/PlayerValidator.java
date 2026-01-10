package domain.player;

import domain.exception.PlayerNotFoundException;
import domain.room.exception.PlayerInRoomException;

import java.util.List;

public class PlayerValidator {
    public Player validatePlayerExist(PlayerId playerId, List<Player> players) {
        return players.stream().filter(player -> player.getId().equals(playerId))
                .findFirst()
                .orElseThrow(() -> new PlayerNotFoundException(playerId));
    }

    public void validatePlayerNotExist(PlayerId playerId, List<Player> players) {
        boolean playerExists = players.stream()
                .anyMatch(player -> player.getId().equals(playerId));
        if (playerExists) {
            throw new PlayerInRoomException(playerId);
        }
    }
}
