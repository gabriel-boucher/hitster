package interfaces.rest.spotify.getAccessToken.dto;

import domain.player.PlayerId;
import domain.room.RoomId;

public record GetAccessTokenData(
        RoomId roomId,
        PlayerId playerId
) {
}
