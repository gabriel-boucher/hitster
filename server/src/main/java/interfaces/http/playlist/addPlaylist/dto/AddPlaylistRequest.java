package interfaces.http.playlist.addPlaylist.dto;

import interfaces.dto.PlaylistDto;

public record AddPlaylistRequest(
        PlaylistDto playlist
) {
}

