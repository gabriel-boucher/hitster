package interfaces.rest.music.removePlaylist.dto;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.music.PlaylistId;

public record RemovePlaylistData(
        RoomId roomId,
        PlayerId playerId,
        PlaylistId playlistId
) {
}

