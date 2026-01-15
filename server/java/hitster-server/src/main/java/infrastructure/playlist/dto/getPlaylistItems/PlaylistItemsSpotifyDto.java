package infrastructure.playlist.dto.getPlaylistItems;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PlaylistItemsSpotifyDto(
        TrackSpotifyDto track
) {
}
