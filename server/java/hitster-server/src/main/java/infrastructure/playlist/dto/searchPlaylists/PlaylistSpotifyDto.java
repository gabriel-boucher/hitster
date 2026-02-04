package infrastructure.playlist.dto.searchPlaylists;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PlaylistSpotifyDto(
        String id,
        String name,
        List<PlaylistImageSpotifyDto> images,
        PlaylistTracksSpotifyDto tracks
) {
}
