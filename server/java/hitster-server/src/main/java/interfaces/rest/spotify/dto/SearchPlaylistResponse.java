package interfaces.rest.spotify.dto;

import interfaces.dto.PlaylistDto;

import java.util.List;

public record SearchPlaylistResponse(
        List<PlaylistDto> playlists
) {
}
