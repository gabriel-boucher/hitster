package interfaces.rest.spotify.playback.play;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.playback.DeviceId;

public class PlayMapper {

    public PlayData toDomain(String roomId, String playerId, PlayRequest request) {
        return new PlayData(
                RoomId.fromString(roomId),
                PlayerId.fromString(playerId),
                new DeviceId(request.deviceId())
        );
    }
}

