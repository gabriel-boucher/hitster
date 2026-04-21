package interfaces.rest.music.searchPlaylists;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.music.Playlist;
import interfaces.mapper.PlaylistMapper;

import java.util.List;

public class SearchPlaylistsMapper {
    private final PlaylistMapper playlistMapper;

    public SearchPlaylistsMapper(PlaylistMapper playlistMapper) {
        this.playlistMapper = playlistMapper;
    }

    public SearchPlaylistsData toDomain(SearchPlaylistsRequest requests) {
        return new SearchPlaylistsData(
                RoomId.fromString(requests.roomId()),
                PlayerId.fromString(requests.playerId()),
                requests.query()
        );
    }

    public SearchPlaylistsResponse toDto(List<Playlist> playlists) {
        return new SearchPlaylistsResponse(
                playlists.stream()
                        .map(playlistMapper::toDto)
                        .toList()
        );
    }
}
