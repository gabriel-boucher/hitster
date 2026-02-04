package interfaces.rest.spotify.searchPlaylists;

import interfaces.dto.PlaylistDto;

import java.util.List;

public record SearchPlaylistResponse(
        List<PlaylistDto> playlists
) {
}
