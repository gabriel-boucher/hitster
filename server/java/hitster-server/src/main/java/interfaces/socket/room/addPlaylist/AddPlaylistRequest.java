package interfaces.socket.room.addPlaylist;

import interfaces.dto.PlaylistDto;

public record AddPlaylistRequest(
        String roomId,
        String playerId,
        PlaylistDto playlist
) {
}
