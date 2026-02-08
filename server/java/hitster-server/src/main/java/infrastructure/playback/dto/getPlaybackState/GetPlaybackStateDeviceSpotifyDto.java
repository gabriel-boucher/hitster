package infrastructure.playback.dto.getPlaybackState;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GetPlaybackStateDeviceSpotifyDto(
        @JsonAlias("volume_percet") int volumePercent
) {
}
