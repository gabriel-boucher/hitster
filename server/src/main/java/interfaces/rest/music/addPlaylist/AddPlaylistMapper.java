package interfaces.rest.music.addPlaylist;

import domain.player.PlayerId;
import domain.room.RoomId;
import interfaces.mapper.PlaylistMapper;
import interfaces.rest.music.addPlaylist.dto.AddPlaylistData;
import interfaces.rest.music.addPlaylist.dto.AddPlaylistRequest;

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

