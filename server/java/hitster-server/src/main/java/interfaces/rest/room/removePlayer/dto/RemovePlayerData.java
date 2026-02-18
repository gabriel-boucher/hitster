package interfaces.rest.room.removePlayer.dto;

import domain.player.PlayerId;
import domain.room.RoomId;

public record RemovePlayerData(
        RoomId roomId,
        PlayerId playerId,
        PlayerId playerToRemoveId
) {
}
