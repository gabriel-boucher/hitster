package interfaces.mapper.responseMapper;

import domain.spotify.playback.PlaybackState;
import interfaces.socket.spotify.PlaybackStateResponse;

public class PlaybackStateMapper {
    public PlaybackStateResponse toDto(PlaybackState playbackState) {
        return new PlaybackStateResponse(
                playbackState.isPlaying(),
                playbackState.volume(),
                playbackState.timePosition(),
                playbackState.duration()
        );
    }
}
