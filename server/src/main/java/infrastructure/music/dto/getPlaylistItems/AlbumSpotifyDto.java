package infrastructure.music.dto.getPlaylistItems;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AlbumSpotifyDto(
        @JsonProperty("release_date") String releaseDate,
        List<AlbumImageSpotifyDto> images
) {
}
