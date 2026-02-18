package interfaces.rest.auth.inMemoryAuth;

import domain.player.PlayerId;
import domain.room.RoomId;

public record AuthInMemoryData(
        RoomId roomId,
        PlayerId playerId
) {
}
