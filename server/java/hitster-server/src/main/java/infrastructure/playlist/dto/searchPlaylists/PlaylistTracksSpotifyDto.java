package infrastructure.playlist.dto.searchPlaylists;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PlaylistTracksSpotifyDto(
        int total
) {
}
