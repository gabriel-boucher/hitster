package interfaces.socket.room.mapper;

import domain.game.player.PlayerId;
import domain.room.RoomId;
import interfaces.socket.room.dto.addPlaylist.AddPlaylistData;
import interfaces.socket.room.dto.addPlaylist.AddPlaylistRequest;
import interfaces.mapper.PlaylistMapper;

public class AddPlaylistMapper {
    private final PlaylistMapper playlistMapper;

    public AddPlaylistMapper(PlaylistMapper playlistMapper) {
        this.playlistMapper = playlistMapper;
    }

    public AddPlaylistData toDomain(AddPlaylistRequest request) {
        return new AddPlaylistData(
                RoomId.fromString(request.roomId()),
                PlayerId.fromString(request.playerId()),
                playlistMapper.toDomain(request.playlist())
        );
    }
}
