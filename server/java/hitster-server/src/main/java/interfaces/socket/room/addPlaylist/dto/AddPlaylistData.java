package interfaces.socket.room.addPlaylist.dto;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.playlist.Playlist;

public record AddPlaylistData(
        RoomId roomId,
        PlayerId playerId,
        Playlist playlist
) {
}
