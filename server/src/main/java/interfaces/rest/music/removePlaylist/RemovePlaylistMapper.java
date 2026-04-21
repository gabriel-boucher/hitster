package interfaces.rest.music.removePlaylist;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.music.PlaylistId;
import interfaces.rest.music.removePlaylist.dto.RemovePlaylistData;
import interfaces.rest.music.removePlaylist.dto.RemovePlaylistRequest;

public class RemovePlaylistMapper {
    public RemovePlaylistData toDomain(RemovePlaylistRequest request) {
        return new RemovePlaylistData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId()),
                new PlaylistId(request.playlistId())
        );
    }
}

