package infrastructure.playlist.mapper;

import domain.spotify.Playlist;
import domain.spotify.PlaylistId;
import infrastructure.playlist.dto.SearchPlaylistsSpotifyDto;

import java.util.List;
import java.util.Objects;

public class SearchPlaylistsSpotifyMapper {
    public List<Playlist> toDomain(SearchPlaylistsSpotifyDto dto) {
        return dto.playlists().items().stream()
                .filter(Objects::nonNull)
                .map(playlistDto -> new Playlist(
                        new PlaylistId(playlistDto.id()),
                        playlistDto.name(),
                        playlistDto.images().getFirst().url(),
                        playlistDto.tracks().total()
                ))
                .toList();
    }
}
