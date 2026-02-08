package infrastructure.playback.dto.getPlaybackState;

import com.fasterxml.jackson.annotation.JsonAlias;

public record GetPlaybackStateItemSpotifyDto(
        @JsonAlias("duration_ms") int duration
) {
}
