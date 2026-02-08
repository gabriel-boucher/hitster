    package interfaces.rest.spotify.playback.seekToPosition;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.playback.DeviceId;

    public class SeekToPositionMapper {

    public SeekToPositionData toDomain(String roomId, String playerId, SeekToPositionRequest request) {
        return new SeekToPositionData(
                RoomId.fromString(roomId),
                PlayerId.fromString(playerId),
                new DeviceId(request.deviceId()),
                request.positionMs()
        );
    }
}

