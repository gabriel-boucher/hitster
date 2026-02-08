package interfaces.rest.spotify.playback.transfer;

import domain.spotify.playback.DeviceId;

public record TransferData(
        DeviceId deviceId,
        boolean play
) {
}
