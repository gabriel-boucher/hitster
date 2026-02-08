package interfaces.rest.spotify.playback.transfer;

public record TransferRequest(
        String deviceId,
        boolean play
) {
}
