package interfaces.rest.spotify.dto;

import domain.player.PlayerId;
import domain.room.RoomId;

public record SearchPlaylistData(
        RoomId roomId,
        PlayerId playerId
) {
}
