package interfaces.rest.room.changePlayerColor.dto;

import domain.player.PlayerColor;
import domain.player.PlayerId;
import domain.room.RoomId;

public record ChangePlayerColorData(
        RoomId roomId,
        PlayerId playerId,
        PlayerColor newColor
) {
}
