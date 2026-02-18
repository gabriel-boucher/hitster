package interfaces.rest.music.searchPlaylists;

import interfaces.dto.PlaylistDto;

import java.util.List;

public record SearchPlaylistsResponse(
        List<PlaylistDto> playlists
) {
}
