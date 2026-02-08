package interfaces.rest.spotify.playback.setVolume;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.playback.DeviceId;

public record SetVolumeData(
        RoomId roomId,
        PlayerId playerId,
        DeviceId deviceId,
        int volumePercent
) {
}

