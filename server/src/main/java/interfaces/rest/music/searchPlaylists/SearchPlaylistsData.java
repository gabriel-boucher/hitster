package interfaces.rest.music.searchPlaylists;

import domain.player.PlayerId;
import domain.room.RoomId;

public record SearchPlaylistsData(
        RoomId roomId,
        PlayerId playerId,
        String query
) {
}
