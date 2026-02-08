package interfaces.rest.spotify.playback.seekToPosition;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.playback.DeviceId;

public record SeekToPositionData(
        RoomId roomId,
        PlayerId playerId,
        DeviceId deviceId,
        int positionMs
) {
}

