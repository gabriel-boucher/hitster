package interfaces.rest.spotify.playback.pause;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.playback.DeviceId;

public record PauseData(
        RoomId roomId,
        PlayerId playerId,
        DeviceId deviceId
) {
}

