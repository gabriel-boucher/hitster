package interfaces.socket.room.addPlaylist.dto;

import interfaces.dto.PlaylistDto;

public record AddPlaylistRequest(
        String roomId,
        String playerId,
        PlaylistDto playlist
) {
}
