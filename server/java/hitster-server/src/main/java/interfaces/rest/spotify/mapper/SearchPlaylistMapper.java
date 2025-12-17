package interfaces.rest.spotify.mapper;

import domain.spotify.Playlist;
import interfaces.mapper.PlaylistMapper;
import interfaces.rest.spotify.dto.SearchPlaylistResponse;

import java.util.List;

public class SearchPlaylistMapper {
    private final PlaylistMapper playlistMapper;

    public SearchPlaylistMapper(PlaylistMapper playlistMapper) {
        this.playlistMapper = playlistMapper;
    }

    public SearchPlaylistResponse toDto(List<Playlist> playlists) {
        return new SearchPlaylistResponse(
                playlists.stream()
                        .map(playlistMapper::toDto)
                        .toList()
        );
    }
}
