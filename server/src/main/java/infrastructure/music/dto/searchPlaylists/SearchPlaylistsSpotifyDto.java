package infrastructure.music.dto.searchPlaylists;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public record SearchPlaylistsSpotifyDto(
        PlaylistsSpotifyDto playlists
) {
}
