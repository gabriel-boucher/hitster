package domain.room.exception;

import domain.game.player.PlayerId;

public class PlayerInRoomException extends RuntimeException {
    public PlayerInRoomException(PlayerId playerId) {
        super("Player with ID " + playerId + " is already in the room.");
    }
}
