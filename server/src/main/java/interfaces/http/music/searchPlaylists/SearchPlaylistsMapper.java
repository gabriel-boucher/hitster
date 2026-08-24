package interfaces.http.music.searchPlaylists;

import domain.game.GameId;
import domain.player.PlayerId;
import domain.music.Playlist;
import interfaces.mapper.PlaylistMapper;

import java.util.List;

public class SearchPlaylistsMapper {
    private final PlaylistMapper playlistMapper;

    public SearchPlaylistsMapper(PlaylistMapper playlistMapper) {
        this.playlistMapper = playlistMapper;
    }

    public SearchPlaylistsData toDomain(String gameId, String playerId, SearchPlaylistsRequest requests) {
        return new SearchPlaylistsData(
                GameId.fromString(gameId),
                PlayerId.fromString(playerId),
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
