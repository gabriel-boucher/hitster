package infrastructure.external.music.spotify.dto.getPlaylistItems;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record ArtistSpotifyDto(
        String name
) {
}
