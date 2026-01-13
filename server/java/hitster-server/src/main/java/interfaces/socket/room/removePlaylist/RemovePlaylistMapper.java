package interfaces.socket.room.removePlaylist;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.PlaylistId;

public class RemovePlaylistMapper {
    public RemovePlaylistData toDomain(RemovePlaylistRequest request) {
        return new RemovePlaylistData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId()),
                new PlaylistId(request.playlistId())
        );
    }
}
