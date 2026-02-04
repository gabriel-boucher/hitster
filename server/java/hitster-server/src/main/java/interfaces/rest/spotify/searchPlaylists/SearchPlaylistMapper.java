package interfaces.rest.spotify.searchPlaylists;

import domain.player.PlayerId;
import domain.room.RoomId;
import domain.spotify.Playlist;
import interfaces.mapper.PlaylistMapper;

import java.util.List;

public class SearchPlaylistMapper {
    private final PlaylistMapper playlistMapper;

    public SearchPlaylistMapper(PlaylistMapper playlistMapper) {
        this.playlistMapper = playlistMapper;
    }

    public SearchPlaylistData toDomain(String roomId, String playerId) {
        return new SearchPlaylistData(
                RoomId.fromString(roomId),
                PlayerId.fromString(playerId)
        );
    }

    public SearchPlaylistResponse toDto(List<Playlist> playlists) {
        return new SearchPlaylistResponse(
                playlists.stream()
                        .map(playlistMapper::toDto)
                        .toList()
        );
    }
}
