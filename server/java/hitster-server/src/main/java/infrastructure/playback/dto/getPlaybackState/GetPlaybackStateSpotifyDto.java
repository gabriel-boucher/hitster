package infrastructure.playback.dto.getPlaybackState;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GetPlaybackStateSpotifyDto(
        @JsonAlias("is_playing") boolean isPlaying,
        @JsonAlias("device") GetPlaybackStateDeviceSpotifyDto device,
        @JsonAlias("progress_ms") int timePosition,
        @JsonAlias("item") GetPlaybackStateItemSpotifyDto item
) {
}
