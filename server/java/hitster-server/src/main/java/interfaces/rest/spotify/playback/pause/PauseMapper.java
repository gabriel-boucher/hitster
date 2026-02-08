package interfaces.rest.spotify.playback.pause;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.playback.DeviceId;

public class PauseMapper {

    public PauseData toDomain(String roomId, String playerId, PauseRequest request) {
        return new PauseData(
                RoomId.fromString(roomId),
                PlayerId.fromString(playerId),
                new DeviceId(request.deviceId())
        );
    }
}

