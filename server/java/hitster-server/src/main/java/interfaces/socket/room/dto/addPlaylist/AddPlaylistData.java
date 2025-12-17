package interfaces.socket.room.dto.addPlaylist;

import domain.game.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.Playlist;

public record AddPlaylistData(
        RoomId roomId,
        PlayerId playerId,
        Playlist playlist
) {
}
