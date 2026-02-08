package interfaces.rest.spotify.playback.setVolume;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.playback.DeviceId;

public class SetVolumeMapper {

    public SetVolumeData toDomain(String roomId, String playerId, SetVolumeRequest request) {
        return new SetVolumeData(
                RoomId.fromString(roomId),
                PlayerId.fromString(playerId),
                new DeviceId(request.deviceId()),
                request.volumePercent()
        );
    }
}

