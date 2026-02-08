package infrastructure.playlist.mapper.searchPlaylists;

import domain.spotify.playlist.Playlist;
import domain.spotify.playlist.PlaylistId;
import infrastructure.playlist.dto.searchPlaylists.SearchPlaylistsSpotifyDto;

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
