package interfaces.http.music.addPlaylist.dto;

import interfaces.dto.PlaylistDto;

public record AddPlaylistRequest(
        String gameId,
        String playerId,
        PlaylistDto playlist
) {
}

