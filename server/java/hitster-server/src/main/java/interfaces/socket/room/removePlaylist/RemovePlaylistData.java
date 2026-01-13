package interfaces.socket.room.removePlaylist;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.PlaylistId;

public record RemovePlaylistData(
        RoomId roomId,
        PlayerId playerId,
        PlaylistId playlistId
) {
}
