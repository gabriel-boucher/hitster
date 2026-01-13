package infrastructure.playlist.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record SearchPlaylistsSpotifyDto(
        PlaylistsSpotifyDto playlists
) {
}
