package interfaces.rest.spotify.dto;

import domain.game.player.PlayerId;
import domain.room.RoomId;

public record SearchPlaylistData(
        RoomId roomId,
        PlayerId playerId
) {
}
