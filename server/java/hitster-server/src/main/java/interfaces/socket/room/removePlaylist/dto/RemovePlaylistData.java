package interfaces.socket.room.removePlaylist.dto;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.playlist.PlaylistId;

public record RemovePlaylistData(
        RoomId roomId,
        PlayerId playerId,
        PlaylistId playlistId
) {
}
