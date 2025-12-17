package interfaces.socket.room.mapper;

import domain.game.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.PlaylistId;
import interfaces.socket.room.dto.removePlaylist.RemovePlaylistData;
import interfaces.socket.room.dto.removePlaylist.RemovePlaylistRequest;

public class RemovePlaylistMapper {
    public RemovePlaylistData toDomain(RemovePlaylistRequest request) {
        return new RemovePlaylistData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId()),
                new PlaylistId(request.playlistId())
        );
    }
}
