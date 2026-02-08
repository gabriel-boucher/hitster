package interfaces.rest.spotify.playback.play;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.playback.DeviceId;

public record PlayData(
        RoomId roomId,
        PlayerId playerId,
        DeviceId deviceId
) {
}

