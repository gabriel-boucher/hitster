package interfaces.socket.room.dto.addPlaylist;

import interfaces.dto.PlaylistDto;

public record AddPlaylistRequest(
        String roomId,
        String playerId,
        PlaylistDto playlist
) {
}
