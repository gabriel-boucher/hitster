package interfaces.socket.room.dto.removePlaylist;

import domain.game.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.PlaylistId;

public record RemovePlaylistData(
        RoomId roomId,
        PlayerId playerId,
        PlaylistId playlistId
) {
}
