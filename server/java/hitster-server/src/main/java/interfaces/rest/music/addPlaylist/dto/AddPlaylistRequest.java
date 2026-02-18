package interfaces.rest.music.addPlaylist.dto;

import interfaces.dto.PlaylistDto;

public record AddPlaylistRequest(
        String roomId,
        String playerId,
        PlaylistDto playlist
) {
}

