package infrastructure.persistence.inMemory.music.dto.searchPlaylists;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record PlaylistImageSpotifyDto(
        String url
) {
}
