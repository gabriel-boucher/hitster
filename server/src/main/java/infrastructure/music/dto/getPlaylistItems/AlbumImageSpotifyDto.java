package infrastructure.music.dto.getPlaylistItems;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record AlbumImageSpotifyDto(
        String url
) {
}
