package infrastructure.playlist.dto.getPlaylistItems;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record TrackSpotifyDto(
        String id,
        String name,
        List<ArtistSpotifyDto> artists,
        AlbumSpotifyDto album
) {
}
